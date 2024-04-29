"use client";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { threadAtom } from "@/app/utils/providers";
import { sidebarExpand } from "../page";

// Components & UI
import ThreadMessages from "./threadMessages";
import ChatInput from "./chatInput";
import { ButtonTrans } from "@/app/ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHashtag } from "@fortawesome/free-solid-svg-icons";


export default function ThreadContent({ className, ...props }) {
    const selectedThread = useRecoilValue(threadAtom);
    const [expanded, setExpanded] = useRecoilState(sidebarExpand);

    return (
        <div className={`${className} grid grid-rows-[auto_1fr_auto] bg-secondary overflow-y-auto`} {...props}>
            <div className="grid grid-cols-[auto_auto_1fr] items-center gap-3 p-4 bg-secondary shadow-lg">
                <ButtonTrans title="Toggle sidebar" className="md:hidden" aria-controls="primary-sidebar" aria-expanded={expanded}
                             onClick={() => setExpanded(prevState => !prevState)} size="sm" square>
                    <FontAwesomeIcon icon={faBars} className="text-400" />
                </ButtonTrans>
                <FontAwesomeIcon className="text-gray-500" icon={faHashtag} />
                <span className="truncate">{selectedThread?.slogan}</span>
            </div>
            <ThreadMessages className="p-4" />
            <ChatInput className="p-4" />
        </div>
    );
}