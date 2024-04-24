import Image from "next/image";
import { signIn, signOut } from "@/auth";

export async function SignIn({ provider }) {
	return (
		<form
			action = {async () => {
				"use server";
				await signIn(provider.id);
			}}
		>
			<button type="submit" className="tile-rounded-sm inline-flex items-center gap-2 w-full">
                <Image
                    src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                    alt="Company logo"
                    width="64"
                    height="64"
                    className="size-4"
                    priority
                    quality={100}
                />
                <span>Sign in with {provider.name}</span>
            </button>
		</form>
	);
}

export async function SignOut() {
	return (
		<form
			action = {async () => {
				"use server";
				await signOut();
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}