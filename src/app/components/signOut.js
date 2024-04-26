import { signOut } from "@/auth";

export async function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirectTo: "/" });
			}}
		>
			<button type="submit" className="btn-rounded-solid-accent inline-grid">Sign Out</button>
		</form>
	);
}
