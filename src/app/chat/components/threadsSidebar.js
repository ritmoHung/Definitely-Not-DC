"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { PopupContext } from "@/app/utils/popup";
import Image from "next/image";
import UserIcon from "/public/img/icon.png";

// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { userProfileAtom, threadAtom } from "@/app/utils/providers";
import { sidebarExpand } from "../page";

// SWR
import useSWR from "swr";
import { axiosFetcher } from "@/app/utils/fetcher";

// Components & UI
import Loader from "@/app/components/loader";
import { ButtonTrans, LinkTrans } from "@/app/ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faXmark, faUsers, faGear } from "@fortawesome/free-solid-svg-icons";



export default function ThreadsSidebar({ className, setIsModalOpen, ...props }) {
    const session = useSession();
    const user = session.data?.user;

    const [expanded, setExpanded] = useRecoilState(sidebarExpand);

    return (
        <aside id="primary-sidebar" className={`${className} grid grid-rows-[auto_1fr_auto] p-2`}
               aria-label="Thread list" {...props}>
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2">
                <ButtonTrans type="button" onClick={() => setIsModalOpen(true)}>
                    <FontAwesomeIcon className="text-600 text-accent" icon={faSquarePlus} />
                    <span>Create</span>
                </ButtonTrans>
                <ButtonTrans title="Close sidebar" className="md:hidden" aria-controls="primary-sidebar" aria-expanded={expanded}
                             onClick={() => setExpanded(false)} square>
                    <FontAwesomeIcon icon={faXmark} className="text-500" />
                </ButtonTrans>
            </div>

            {/* Threads List */}
            <ThreadList className="p-1" user={user} />

            {/* User Info */}
            <UserInfo className="!p-2 !pb-0 !border-x-0 !border-b-0" user={user} />
        </aside>
    );
}

function ThreadList({ className, user }) {
    const { addPopupMessage } = useContext(PopupContext);
    const [selectedThread, setSelectedThread] = useRecoilState(threadAtom);
    const [expanded, setExpanded] = useRecoilState(sidebarExpand);

    const { data, isLoading, error } = useSWR(
        () => (user?.id) ? `/api/threads/?user_id=${user?.id}` : null,
        axiosFetcher
    );

    useEffect(() => {
        if (error) {
            addPopupMessage({ message: error.message, level: error.level });
        }
    }, [error]);
    useEffect(() => {
        if (data) {
            // if (data.data.length > 0 && !selectedThread) setSelectedThread(data.data[0]);
            (data.level === "log")
                ? console.log(data.message)
                : addPopupMessage({ message: data.message, level: data.level });
        }
    }, [data]);

    if (isLoading) {
        return (
            <Loader className="grid place-content-center"></Loader>
        );
    }

    function requestNotificationPermission() {
        if (!("Notification" in window)) {
            console.warn("Browser does not support notifications");
        } else if (Notification.permission === "granted") {
            return;
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                console.log("Notification permission:", permission);
            });
        }
    }

    function handleClick(thread) {
        if (thread !== selectedThread) setSelectedThread(thread);
        setExpanded(false);
        requestNotificationPermission();
    }

    return (
        <ul className={`${className} grid auto-rows-min gap-2 overflow-x-hidden overflow-y-auto`}>
            {data?.data && data?.data.map(thread => (
                <li key={thread.thread_id}>
                    <button type="button" className="tile-rounded-trans-sm inline-flex items-center justify-between gap-2 w-full" data-selected={thread.thread_id === selectedThread?.thread_id}
                            onClick={() => handleClick(thread)}>
                        <div className="flex items-center gap-2">
                            {thread.image ? (
                                <Image
                                    src={thread.image}
                                    alt={`Thread ${thread.name} icon`}
                                    className="size-4 aspect-square"
                                    priority
                                    quality={100}
                                />
                            ) : (
                                <div className="aspect-square">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                            )}
                            <span className="text-left">{thread.name}</span>
                        </div>
                        {thread.public && <span className="tile-rounded-accent-inline !px-2 text-200 font-bold uppercase !rounded-full">Public</span>}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function UserInfo({ className, user }) {
    const userProfile = useRecoilValue(userProfileAtom);

    return (
        <div className={`${className} tile-border-trans-even-xs flex items-center justify-between`}>
            <div className="flex items-center gap-4">
                <div className="relative w-10 aspect-square">
                    <Image
                        src={user?.image ? user?.image : UserIcon}
                        alt={`${user?.name}'s avatar`}
                        className="object-contain w-full rounded-[100vw]" fill
                        sizes="2.5rem"
                        priority
                        quality={100}
                    />
                </div>
                <div className="grid">
                    <span className={`${user?.name ? "font-semibold" : "text-gray-500"} truncate`}>
                        {user?.name ? user.name : "Having your good name..."}
                    </span>
                    <span className="text-gray-500 text-300 truncate">
                        {userProfile?.status ? userProfile?.status : "☝️君をハナセナイ🫴"}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <LinkTrans href="/chat/settings" square>
                    <FontAwesomeIcon icon={faGear} />
                </LinkTrans>
            </div>
        </div>
    );
}