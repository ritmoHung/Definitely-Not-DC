"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

// Components & UI
import { SignInWithCreds, SignInWithProvider } from "@/app/components/signIn";
import { FormInput } from "@/app/ui/form";

const providerMap = [
    {
        id: "credentials",
        name: "Credentials",
    },
    {
        id: "google",
        name: "Google",
    },
];

const titles = [
    ["想聊天？", "就用\u2009", "DNDC"],
    ["DNDC，", "啟動！"],
];

export function SignInPanel({ className }) {
    const [title, setTitle] = useState([]);
    
    useEffect(() => {
        setTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, []);

    function isTarget(words, index, length) {
        return (words === "DNDC") && (index == length - 1);
    }

    return (
        <div className={`${className} tile-rounded-xl w-[clamp(18rem,_90vw,_30rem)] sm:m-8 shadow-2xl`}>
            <div className="my-2">
                {/* Title */}
                <h1 className="mb-6 font-jb-mono">
                    {title.map((words, index) => (
                        <Fragment key={index}>
                            {(index !== 0 && !isTarget(words, index, title.length)) && <br />}
                            <span key={index} className={`${(words === "DNDC" && (index === title.length - 1)) ? "text-accent" : ""}`}>{words}</span>
                        </Fragment>
                    ))}
                    <span className="input-caret align-[0.05em]">&thinsp;_</span>
                </h1>

                {/* Content */}
                <div className="grid gap-y-4">
                    {/* Credentials */}
                    <SignInWithCreds provider={providerMap.find(provider => provider.id === "credentials")}>
                        <FormInput type="email" id="cred-email" name="email" placeholder="Email" required />
                        <FormInput type="password" id="cred-password" name="password"  placeholder="Password" required />
                    </SignInWithCreds>

                    {/* Sign Up Link */}
                    <span className="grid xs:inline text-gray-500 text-center">
                        Don&apos;t have an account?&nbsp;
                        <Link href="/signup" className="text-accent">Sign up.</Link>
                    </span>

                    {/* Separator */}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 uppercase">
                        <div className="h-[1px] bg-accent"></div>
                        <span>Or</span>
                        <div className="h-[1px] bg-accent"></div>
                    </div>

                    {/* Other Providers */}
                    {Object.values(providerMap).map((provider) => (
                        provider.id !== "credentials"
                            ? <SignInWithProvider key={provider.id} provider={provider} />
                            : null
                    ))}
                </div>
            </div>
        </div>
    );
}