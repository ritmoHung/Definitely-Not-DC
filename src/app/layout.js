import "@/app/scss/global.scss";
import Providers from "@/app/utils/providers";

// Google Fonts
import { Manrope, Noto_Sans_TC } from "next/font/google";
const manrope = Manrope({
    weight: ["variable"],
    style: ["normal"],
    display: "swap",
    subsets: ["latin"],
    variable: "--font-manrope",
});
const notoSansTC = Noto_Sans_TC({
    weight: ["variable"],
    style: ["normal"],
    display: "swap",
    subsets: ["latin"],
    variable: "--font-noto-sans-tc",
});

// FontAwesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Data Analysis
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Metadata
const title = "Def Not Discord";
const description = "歡迎來到 Def Not Discord —— 儘管他真的長得很像 Discord。";
const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
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

export default function RootLayout({ children }) {
	return (
		<html lang="en">
            <head>
                <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
                <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
            </head>
			<body className={`text-primary bg-primary min-h-svh ${manrope.variable} ${notoSansTC.variable}`}>
                <Providers>
                    {children}
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
		</html>
	);
}