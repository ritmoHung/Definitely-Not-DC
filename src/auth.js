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
                let userInfo = { email: credentials.email };
                let userData = await authenticateUser(userInfo);

                if (userData) {
                    const match = await verifyPassword(credentials.password, userData.password);
                    if (match) {
                        user = {
                            id: userData.user_id,
                            name: userData.name,
                            email: userData.email,
                            image: userData.image,
                        };
                    }
                } else {
                    // Directly creates user if DNE
                    userInfo.password = await hashPassword(credentials.password);
                    userData = await createUser(userInfo);
                    user = {
                        id: userData.user_id,
                        name: userData.name,
                        email: userData.email,
                        image: userData.image,
                    };
                }

                return user;
            } catch(error) {
                console.error(`AUTH::${error.message}`);
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
        async signIn({ user, account, profile }) {
            if (account.provider === "credentials") {
                return true;
            } else {
                try {
                    // Find if user exists in DB
                    const userInfo = {
                        email: user.email,
                        name: user.name || profile.name,
                        image: user.image || profile.picture,
                    };
                    let userData = await authenticateUser(userInfo);

                    // Directly creates user if DNE
                    if (!userData) userData = await createUser(userInfo);

                    user.id = userData.user_id;
                    user.name = userData.name;
                    user.email = userData.email;
                    user.image = userData.image;
                    user.status = userData.status;

                    return true;
                } catch(error) {
                    console.error(`SIGN::${error.message}`);
                    return false;
                }
            }
        },
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