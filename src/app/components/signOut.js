import { signOut } from "next-auth/react";

// UI
import { ButtonSolid } from "@/app/ui/button";

export function SignOut() {
    const title = "Sign Out";

    function handleClick() {
        signOut({ callbackUrl: "/" });
    }

	return (
        <ButtonSolid title={title} className="inline-grid" onClick={handleClick}>
            <span>{title}</span>
        </ButtonSolid>
	);
}