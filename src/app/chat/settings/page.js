"use client";

// Components
import { SignOut } from "@/app/components/signOut";
import { ThemeSelect, PaletteSelect } from "@/app/components/theme";

export default function Settings() {
    return (
        <div className="grid place-content-center place-items-center gap-4 w-screen h-svh">
            <div className="flex items-center gap-2">
                <ThemeSelect />
                <PaletteSelect />
            </div>
            <SignOut />
        </div>
    );
}