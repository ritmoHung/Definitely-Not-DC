// Metadata
const title = "設定";
const description = "Settings";
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