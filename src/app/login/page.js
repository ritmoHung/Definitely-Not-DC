"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PopupContext } from "@/app/utils/popup";

import LoginDeco from "./components/loginDeco";
import LoginPanel from "./components/loginPanel";

export default function Login() {
    const { addPopupMessage } = useContext(PopupContext);
    const router = useRouter();
    let error = useSearchParams().get("error");

    useEffect(() => {
        if (error) {
            if (error === "CredentialsSignin") error = "Incorrect email or password.";
            addPopupMessage({ message: error, level: "error" });
            router.push("/login");
        }
    }, []);

    return (
        <div className="grid grid-stack 2xl:grid-stack-none 2xl:grid-cols-2 h-full isolate">
            <LoginDeco className="overflow-hidden -z-1" />
            <LoginPanel className="place-self-center" />
        </div>
    );
}