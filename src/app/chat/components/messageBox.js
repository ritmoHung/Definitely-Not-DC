"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from "/public/img/icon.png";

// Recoil
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "@/app/utils/providers";

// Markdown
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ButtonTrans } from "@/app/ui/button";



export default function MessageBox({ className, message, prevUserId, prevUpdatedAt }) {
    const session = useSession();
    const user = session.data?.user;
    const userProfile = useRecoilValue(userProfileAtom);

    const isUser = message.user_id === user?.id;
    const name = isUser ? user?.name : message.user_id.substring(0, 6);
    const prevDate = new Date(prevUpdatedAt);
    const thisDate = new Date(message.updatedAt);
    const contentOnly = (message.user_id === prevUserId) && (thisDate - prevDate < 2 * 60000);
    const sameDay = 
        prevDate.getFullYear() === thisDate.getFullYear() &&
        prevDate.getMonth() === thisDate.getMonth() &&
        prevDate.getDate() === thisDate.getDate();

    return (
        <>
            {/* Separator */}
            {!sameDay && (
                <div className={`${className} !pe-0 message-separator`}>
                    <div></div>
                    <span className="message-date">
                        {thisDate.toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                        })}
                    </span>
                    <div></div>
                </div>
            )}

            {/* Message */}
            <div className={`${className} message-box`} data-content-only={contentOnly}>
                <div className="message-icon w-10 sm:w-12">
                    {contentOnly ? (
                        <span className="message-time">
                            {thisDate.toLocaleTimeString("en-US", {
                                hour: "numeric", minute: "2-digit", hour12: false
                            })}
                        </span>
                    ) : (
                        <Image
                            src={isUser && user?.image ? user?.image : UserIcon}
                            alt={`${user?.name}'s avatar`}
                            className="size-10 sm:size-12 rounded-full"
                            width="64" height="64"
                            priority
                            quality={100}
                        />
                    )}
                </div>
                
                {!contentOnly && (
                    <div className="message-info">
                        <span className="text-accent font-semibold text-nowrap"
                            style={{ color: userProfile?.color && message.user_id === user?.id ? userProfile?.color : undefined }}>
                            {name}
                        </span>
                        <span className="message-date hidden xs:inline">
                            {thisDate.toLocaleTimeString("en-US", {
                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"
                            })}
                        </span>
                        <span className="message-date inline xs:hidden">
                            {thisDate.toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </span>
                    </div>
                )}
                <div className="message-content">
                    <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]} components={{ code: processCode }}>
                        {message.content}
                    </Markdown>
                </div>
            </div>
        </>
    );
}

function processCode({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");

    function handleCopyCode(code) {
        navigator.clipboard.writeText(code)
            .catch(err => {
                console.error("Error copying text:", err);
            });
    }

    return !inline && match ? (
        <div>
            <div className="flex items-center justify-between px-4 py-2 font-geist-mono text-white text-300 bg-black rounded-t-md">
                <span>{match[1]}</span>
                <ButtonTrans size="sm" onClick={() => handleCopyCode(String(children).replace(/\n$/, ""))}>
                    <span>Copy</span>
                </ButtonTrans>
            </div>
            <SyntaxHighlighter style={tomorrow} language={match[1]} className="!mt-0 rounded-b-md" showLineNumbers wrapLines PreTag="div" {...props}>
                 {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className={`${className} tile-border-rounded-sm font-geist-mono`} {...props}>
            {children}
        </code>
    );
}