import Image from "next/image";
import { signIn, signOut } from "@/auth";

// UI
import { FormAction } from "@/app/ui/form";

export async function SignIn({ children, provider }) {
    const isCredentials = provider.id === "credentials";

	return (
		<FormAction
			action = {async (formData) => {
				"use server";
                if (isCredentials) await signIn(provider.id, formData);
				else await signIn(provider.id);
			}}
		>
            {children}
			<button type="submit" className={`btn-rounded-solid-accent inline-grid ${isCredentials ? "grid-cols-1" : "grid-cols-[auto_1fr]"} items-center gap-2 w-full`}>
                {!isCredentials && 
                    <Image
                        src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                        alt="Company logo"
                        width="64"
                        height="64"
                        className="size-4"
                        priority
                        quality={100}
                    />
                }
                <span>Sign in{!isCredentials ? ` with ${provider.name}` : ""}</span>
            </button>
		</FormAction>
	);
}

export async function SignOut() {
	return (
		<FormAction
			action = {async () => {
				"use server";
				await signOut();
			}}
		>
			<button type="submit" className="btn-rounded-solid-accent inline-grid">Sign Out</button>
		</FormAction>
	);
}