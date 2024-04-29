import Image from "next/image";

// Markdown
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBox({ message }) {
    return (
        <div className="message-box">
            <div className="message-icon">
                {message.image ? (
                    <Image
                        src={message.image}
                        alt={`Thread ${thread.name} icon`}
                        className="size-10 sm:size-12"
                        priority
                        quality={100}
                    />
                ) : (
                    <div className="size-10 sm:size-12 bg-gray-500 rounded-full"></div>
                )}
            </div>
            <div className="message-info">
                <span className="text-accent text-nowrap">{message?.user_id.substring(0, 6)}</span>
                <span className="hidden xs:inline text-300 text-gray-500">
                    {new Date(message.updatedAt).toLocaleTimeString("en-US", {
                        year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"
                    })}
                </span>
                <span className="inline xs:hidden text-300 text-gray-500">
                    {new Date(message.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                    })}
                </span>
            </div>
            <div className="message-content">
                <Markdown className="whitespace-pre-wrap" remarkPlugins={[[remarkGfm, { singleTilde: false }]]} components={{ code: processCode }}>
                    {message.content}
                </Markdown>
            </div>
        </div>
    );
}

function processCode({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    function handleCopyCode(code) {
        navigator.clipboard.writeText(code)
            .catch(err => {
                console.error("Error copying text: ", err);
            });
    }

    return !inline && match ? (
        // TODO: Padding does not work on the right
        <div className="relative mb-5">
            <div className="flex justify-between items-center bg-black text-white py-2 px-4 rounded-t-md">
                <span className="text-sm">{match[1]}</span>
                <div className="flex items-center">
                    <button onClick={() => handleCopyCode(String(children).replace(/\n$/, ''))}
                        className="ml-2 text-gray-300 hover:text-white focus:outline-none transition duration-300 ease-in-out">
                        Copy
                    </button>
                </div>
            </div>
            <SyntaxHighlighter style={tomorrow} language={match[1]} showLineNumbers wrapLines PreTag="div" {...props} customStyle={{ marginTop: '0px' }}>
                 {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </div>
    ) : (
        <code className={`${className} tile-border-rounded-inline font-jb-mono`} {...props}>
            {children}
        </code>
    );
}