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
            let user = {};

            try {
                // Find if user exists in DB
                let userInfo = { email: credentials.email };
                let userData = await authenticateUser(userInfo);

                if (userData) {
                    const match = await verifyPassword(credentials.password, userData.password);
                    if (!match) throw new Error("PW: Password mismatch.");
                } else {
                    // Directly creates user if DNE
                    userInfo.password = await hashPassword(credentials.password);
                    userInfo.account_id = userInfo.email.split("@")[0];
                    userData = await createUser(userInfo);
                }

                // Assign returned data to 'user'
                const { user_id: id, ...others } = userData;
                user.id = id;
                Object.assign(user, others);

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
                    let userInfo = { email: user.email };
                    let userData = await authenticateUser(userInfo);

                    // Directly creates user if DNE
                    if (!userData) {
                        userInfo.name = user.name || profile.name;
                        userInfo.image = user.image || profile.picture;
                        userInfo.account_id = userInfo.email.split("@")[0];
                        userData = await createUser(userInfo);
                    }

                    // Assign returned data to 'user'
                    const { user_id: id, ...others } = userData;
                    user.id = id;
                    Object.assign(user, others);

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
        async jwt({ token, user }) {
            if (user) token.aid = user.account_id;
            return token;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            session.user.aid = token.aid;
            return session;
        },
    },
});