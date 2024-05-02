"use client";
import { useRouter } from "next/navigation";
import { axiosFetcher } from "@/app/utils/fetcher";

// Components & UI
import Link from "next/link";
import { FormSubmit, FormInput } from "@/app/ui/form";
import { ButtonSolid } from "@/app/ui/button";



export function SignUpPanel({ className }) {
    const router = useRouter();
    
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userInfo = {
            email: formData.get("signup-email"),
            password: formData.get("signup-password"),
        };

        try {
            const res = await axiosFetcher("/api/signUp", {
                method: "POST",
                data: userInfo,
            });
            
            if (res.level === "log") {
                console.log(res.message);
            } else {
                router.push(`/${res?.data ? "signin" : "signup"}?${res?.data ? "success" : "error"}=${encodeURIComponent(res.message)}`);
            }
        } catch (error) {
            router.push(`/signup?error=${encodeURIComponent(error.message)}`);
        }
    }

    return (
        <div className={`${className} tile-rounded-xl w-[clamp(18rem,_90vw,_24rem)] sm:m-8 shadow-2xl`}>
            <div className="my-2">
                {/* Title */}
                <h1 className="mb-6 font-jb-mono">
                    註冊
                    <span className="input-caret align-[0.05em]">&thinsp;_</span>
                </h1>

                {/* Content */}
                <div className="grid gap-y-4">
                    {/* Credentials */}
                    <FormSubmit id="form-signup" handleSubmit={handleSubmit}>
                        <FormInput type="email" id="signup-email" name="signup-email" placeholder="Email" required />
                        <FormInput type="password" id="signup-password" name="signup-password"  placeholder="Password" required />
                        <ButtonSolid type="submit" className="w-full">
                            <span>Sign up</span>
                        </ButtonSolid>
                    </FormSubmit>

                    {/* Sign In Link */}
                    <span className="grid xs:inline text-gray-500 text-center">
                        Already have an account?&nbsp;
                        <Link href="/signin" className="text-accent">Sign in.</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}