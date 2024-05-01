// Metadata
const title = "設定";
const description = "「絕不是 Discord」的設定頁面目前只能夠讓你登出 —— 真是太令人難過了。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chat/settings`;
export const metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        url,
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
}



export default function SettingsLayout({ children }) {
    return (
        <div id="settings-layout" className="">
            {children}
        </div>
    );
}