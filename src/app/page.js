// UI
import { LinkSolid } from "@/app/ui/button";

export default function Home() {
	return (
		<header className="isolate">
            <nav className="fixed tile-border-lg grid justify-end w-screen !border-x-0 !border-t-0">
                <LinkSolid href="/signin">Open DNDC</LinkSolid>
            </nav>
			<div className="grid place-content-center gap-32 h-svh [&_>_*]:px-4 [&_>_*]:md:px-16
                            place-items-center xl:place-items-start">
                <h1 className="font-black text-5xl sm:text-6xl lg:text-8xl text-center xl:text-left">Def Not Discord!</h1>
            </div>
		</header>
	);
}