"use client";

// Recoil
import { useRecoilValue } from "recoil";
import { threadAtom } from "@/app/utils/providers";

// Components
import ThreadsNavbar from "./components/threadsNavbar";
import ThreadMessages from "./components/threadMessages";
import ChatInput from "./components/chatInput";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";



export default function Chat() {
    const selectedThread = useRecoilValue(threadAtom);

    return (
        <div className="grid grid-cols-[auto_1fr] h-svh overflow-hidden">
            <ThreadsNavbar />
            <div className="grid grid-rows-[auto_1fr_auto] bg-secondary overflow-y-auto">
                <div className="flex items-center gap-2 p-4 bg-secondary shadow-lg">
                    <FontAwesomeIcon className="text-gray-500" icon={faHashtag} />
                    <span>{selectedThread?.slogan}</span>
                </div>
                <ThreadMessages className="p-4" />
                <ChatInput className="p-4" />
            </div>
        </div>
    );
}