import { Fragment } from "react";
import { providerMap } from "@/auth";
import { SignIn } from "@/app/utils/sign";

const titles = [
    ["想聊天？", "就用", "DNDC"],
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
                <h1 className="mb-6 font-jb-mono">
                    {title.map((words, index) => (
                        <Fragment key={index}>
                            {(index !== 0 && !isTarget(words, index, title.length)) && <br />}
                            <span key={index} className={`${(words === "DNDC" && (index === title.length - 1)) ? "text-accent" : ""}`}>{words}</span>
                        </Fragment>
                    ))}
                    <span className="input-caret align-[0.05em]">&thinsp;_</span>
                </h1>
                <div className="grid gap-y-2">
                    {Object.values(providerMap).map((provider) => (
                        <SignIn key={provider.id} provider={provider} />
                    ))}
                </div>
            </div>
        </div>
    );
}