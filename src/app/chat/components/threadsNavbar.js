"use client";
import { useSession } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { PopupContext } from "@/app/utils/popup";
import Image from "next/image";

// Recoil
import { useRecoilState } from "recoil";
import { threadAtom } from "@/app/utils/providers";

// SWR
import useSWR from "swr";
import { axiosFetcher } from "@/app/utils/fetcher";

// Components & UI
import ThreadCreateModal from "./threadCreateModal";
import Loader from "@/app/components/loader";
import { ButtonTrans, LinkTrans } from "@/app/ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faUsers, faGear } from "@fortawesome/free-solid-svg-icons";



export default function ThreadsNavbar({ className }) {
    const session = useSession();
    const user = session.data?.user;

    return (
        <nav className={`${className} grid grid-rows-[auto_1fr_auto] p-2`}>
            {/* Toolbar */}
            <div className="p-1">
                <ThreadCreateButton />
            </div>

            {/* Threads List */}
            <ThreadList className="p-1" user={user} />

            {/* User Info */}
            <UserInfo className="!p-2 !pb-0 !border-x-0 !border-b-0" user={user} />
        </nav>
    );
}

function ThreadCreateButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <ButtonTrans type="button" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon className="text-600 text-accent" icon={faSquarePlus} />
                <span className="hidden sm:inline">Create</span>
            </ButtonTrans>
            {isOpen && <ThreadCreateModal user={user} closeModal={() => setIsOpen(false)} />}
        </div>
    );
}

function ThreadList({ className, user }) {
    const { addPopupMessage } = useContext(PopupContext);
    const [selectedThread, setSelectedThread] = useRecoilState(threadAtom);

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
            if (data.level === "log") {
                console.log(data.message);
            } else {
                addPopupMessage({ message: data.message, level: data.level });
            }
        }
    }, [data]);

    if (isLoading) {
        return (
            <Loader className="grid place-content-center"></Loader>
        );
    }

    return (
        <ul className={`${className} grid auto-rows-min gap-2 overflow-x-hidden overflow-y-auto`}>
            {data?.data && data?.data.map(thread => (
                <li key={thread.thread_id}>
                    <button type="button" className="tile-rounded-trans-xs inline-flex items-center gap-2 w-full" data-selected={thread.thread_id === selectedThread?.thread_id}
                            onClick={() => setSelectedThread(thread)}>
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
                        <span>{thread.name}</span>
                        {thread.public && <span className="tile-rounded-accent-inline !px-2 text-200 font-normal !rounded-full">Public</span>}
                    </button>
                </li>
            ))}
        </ul>
    );
}

function UserInfo({ className, user }) {
    return (
        <div className={`${className} tile-border-trans-even-xs flex items-center justify-between`}>
            <div className="flex items-center gap-4">
                <div className="relative w-10 aspect-square">
                    {user?.image && (
                        <Image
                            src={user?.image}
                            alt={`${user?.name}'s avatar`}
                            className="object-contain w-full rounded-[100vw]" fill
                            sizes="2.5rem"
                            priority
                            quality={100}
                        />
                    )}
                </div>
                <div>
                    <span>{user?.name}</span>
                    <span>{user?.status}</span>
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