import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginDeco from "./components/loginDeco";
import LoginPanel from "./components/loginPanel";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/chat");

    return (
        <div className="grid grid-stack 2xl:grid-stack-none 2xl:grid-cols-2 h-full isolate">
            <LoginDeco className="overflow-hidden -z-1" />
            <LoginPanel className="place-self-center" />
        </div>
    );
}