import { authenticateUser, createUser } from "@/app/utils/userUtils";
import { hashPassword, verifyPassword } from "./app/utils/pwUtils";

// Auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const providers = [
    Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            const baseUrl = process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : "http://localhost:3000";
            let user;

            console.log(baseUrl);
            try {
                // Find if user exists in DB
                const userInfo = { email: credentials.email };
                let userData = await authenticateUser(userInfo);

                if (userData) {
                    const match = await verifyPassword(credentials.password, userData.password);
                    if (match) user = { id: userData.user_id, name: userData.name, email: userData.email };
                } else {
                    // Directly creates user if DNE
                    userInfo.password = await hashPassword(credentials.password);
                    userData = await createUser(userInfo);
                    user = { id: userData.user_id, name: userData.name, email: userData.email };
                }
                return user;
            } catch(error) {
                console.error("Authentication error:", error);
                return null;
            }
        }
    }),
    Google,
];

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers,
	pages: {
		signIn: "/login",
	},
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname.startsWith("/chat")) return !!auth;
            return true;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
});