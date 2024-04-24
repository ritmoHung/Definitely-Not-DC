import LoginFooter from "./components/loginFooter";

// Metadata
const title = "登入";
const description = "Login";
const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/login`;
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



export default function LoginLayout({ children }) {
    return (
        <div id="login-layout" className="w-screen h-svh">
            {children}
            <LoginFooter />
        </div>
    );
}