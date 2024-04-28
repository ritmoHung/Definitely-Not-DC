import { signOut } from "@/auth";

// UI
import { ButtonSolid } from "@/app/ui/button";

export async function SignOut() {
    const title = "Sign Out";

	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirectTo: "/" });
			}}
		>
            <ButtonSolid type="submit" title={title} className="inline-grid">
                <span>{title}</span>
            </ButtonSolid>
		</form>
	);
}