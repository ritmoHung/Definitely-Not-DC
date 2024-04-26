import { auth } from "@/auth";
import Link from "next/link";

export default async function Chat() {
    const session = await auth();

    return (
        <div className="grid place-items-center gap-4">
            <span>Welcome back, {session?.user.name}!</span>
            <Link href="/chat/settings" className="btn-rounded-solid-accent">Settings</Link>
        </div>
    );
}