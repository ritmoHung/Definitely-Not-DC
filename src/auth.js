import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const providers = [
    Google,
    Credentials({
        credentials: {
            email: {},
            password: {},
        },
        // authorize: async (credentials) => {
        //     let user = null;
        //     // const pwHash = null;
        //     // user = await;

        //     if (!user) throw new Error("Some error");
        //     return user;
        // }
    }),
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
    },
});