// Metadata
const title = "聊天";
const description = "歡迎來到 Def Not Discord —— 儘管他真的長得很像 Discord。";
const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/chat`;
export const metadata = {
    metadataBase: new URL(url ?? "http://localhost:3000"),
    title: {
        default: title,
        template: "%s | DNDC",
    },
	description,
    openGraph: {
        title,
        description,
        url,
        locale: "zh-TW",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        site: "@ritmo_v0",
        siteId: "904003428262723584",
        creator: "@ritmo_v0",
        creatorId: "904003428262723584",
    },
}



export default async function ChatLayout({ children }) {
    return (
        <div id="chat-layout" className="">
            {children}
        </div>
    );
}