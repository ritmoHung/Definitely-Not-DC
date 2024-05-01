import "@/app/scss/chat.scss";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Metadata
const title = "聊天";
const description = "在「絕不是 Discord」，你仍然絕對能夠聊天。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chat`;
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
    const session = await auth();
    if (!session?.user.id) {
        const errorMessage = encodeURIComponent("You are not signed in.");
        redirect(`/login?error=${errorMessage}`);
    }

    return (
        <div id="chat-layout" className="">
            {children}
        </div>
    );
}