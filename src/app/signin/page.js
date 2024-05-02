"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PopupContext } from "@/app/utils/popup";

// Components
import SignDeco from "@/app/components/signpage/signDeco";
import { SignInPanel } from "@/app/components/signpage/signInPanel";

export default function Login() {
    const { addPopupMessage } = useContext(PopupContext);
    const router = useRouter();
    let error = useSearchParams().get("error");

    useEffect(() => {
        if (error) {
            if (error === "CredentialsSignin") error = "Incorrect email or password.";
            addPopupMessage({ message: error, level: "error" });
            router.push("/signin");
        }
    }, []);

    return (
        <div className="grid grid-stack 2xl:grid-stack-none 2xl:grid-cols-2 h-full isolate">
            <SignDeco className="overflow-hidden -z-1" />
            <SignInPanel className="place-self-center" />
        </div>
    );
}