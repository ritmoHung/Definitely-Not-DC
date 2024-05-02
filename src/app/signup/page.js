"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";
import { PopupContext } from "@/app/utils/popup";

// Components
import SignDeco from "@/app/components/signpage/signDeco";
import { SignUpPanel } from "@/app/components/signpage/signUpPanel";

export default function SignUp() {return (
        <Suspense>
            <SignUpPage />
        </Suspense>
    );
}

function SignUpPage() {
    const { addPopupMessage } = useContext(PopupContext);
    const searchParams = useSearchParams();
    const router = useRouter();

    let success = searchParams.get("success");
    let error = searchParams.get("error");

    useEffect(() => {
        if (success) {
            addPopupMessage({ message: success, level: "success" });
            router.push("/signup");
        }
    }, [success]);
    useEffect(() => {
        if (error) {
            addPopupMessage({ message: error, level: "error" });
            router.push("/signup");
        }
    }, [error]);

    return (
        <div className="grid grid-stack 2xl:grid-stack-none 2xl:grid-cols-2 h-full isolate">
            <SignDeco className="overflow-hidden -z-1" />
            <SignUpPanel className="place-self-center" />
        </div>
    );
}