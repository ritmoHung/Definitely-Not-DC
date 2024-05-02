// Components
import SignFooter from "@/app/components/signpage/signFooter";

// Metadata
const title = "註冊";
const description = "「絕不是 Discord」絕不會放棄你，絕不會令你沮喪，絕不會拋棄你，絕不會讓你哭，絕不會同你道別，絕不會用謊言傷害你。不過前提是你絕不登出。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/signㄧㄣ`;
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



export default async function LoginLayout({ children }) {
    return (
        <div id="login-layout" className="w-screen h-svh">
            {children}
            <SignFooter />
        </div>
    );
}