import { Fragment } from "react";
import { providerMap } from "@/auth";
import { SignIn } from "@/app/utils/sign";

// UI
import { FormInput } from "@/app/ui/form";

const titles = [
    ["想聊天？", "就用\u2009", "DNDC"],
    ["DNDC，", "啟動！"],
];

function getRandomTitle() {
    const title = titles[Math.floor(Math.random() * titles.length)];
    return title;
}

export default function LoginPanel({ className }) {
    const title = getRandomTitle();

    function isTarget(words, index, length) {
        return (words === "DNDC") && (index == length - 1);
    }

    return (
        <div className={`${className} tile-rounded-xl w-[clamp(18rem,_90vw,_30rem)] sm:m-8`}>
            <div className="my-4">
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
                    <SignIn provider={providerMap.find(provider => provider.id === "credentials")}>
                        <FormInput type="email" id="cred-email" label="Email" placeholder="Email" required />
                        <FormInput type="password" id="cred-password" label="Password"  placeholder="Password" required />
                    </SignIn>

                    {/* Separator */}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 uppercase">
                        <div className="h-[1px] bg-accent"></div>
                        <span>Or</span>
                        <div className="h-[1px] bg-accent"></div>
                    </div>

                    {/* Other Providers */}
                    {Object.values(providerMap).map((provider) => (
                        provider.id !== "credentials"
                            ? <SignIn key={provider.id} provider={provider} />
                            : null
                    ))}
                </div>
            </div>
        </div>
    );
}