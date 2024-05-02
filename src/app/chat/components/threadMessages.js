"use client";
import { useSession } from "next-auth/react";
import { useRef, useEffect } from "react";

// Recoil
import { useRecoilValue } from "recoil";
import { threadAtom } from "@/app/utils/providers";

// SWR
import useSWR from "swr";
import { axiosFetcher } from "@/app/utils/fetcher";

// Components
import MessageBox from "./messageBox";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/app/components/loader";



export default function ThreadMessages({ className }) {
    const session = useSession();
    const user = session.data?.user;
    const selectedThread = useRecoilValue(threadAtom);
    const scrollRef = useRef(null);

    const { data, isLoading, error } = useSWR(
        () => (selectedThread?.thread_id) ? `/api/messages/?thread_id=${selectedThread?.thread_id}` : null,
        axiosFetcher,
        { refreshInterval: 500 }
    );

    const prevDataRef = useRef();
    const prevThreadIdRef = useRef();

    // Browser notification & auto scroll
    useEffect(() => {
        function sendNotification(message) {
            if (Notification.permission === "granted") {
                const notification = new Notification(`#${selectedThread.name}`, {
                    body: `Message sent by ${message.user_id.substring(0, 6)}: ${message.content.slice(0, 20)}`,
                    icon: "../../icon.png",
                });

                notification.onclick = () => {
                    window.focus;
                }
            }
        }

        function scrollToEnd() {
            const scrollElement = scrollRef.current;
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }

        if (data?.data) {
            if (selectedThread !== prevThreadIdRef.current) {
                // Thread change, reset data ref
                prevDataRef.current = undefined;
                prevThreadIdRef.current = selectedThread;
                scrollToEnd();
            } else if (data && JSON.stringify(data.data) !== prevDataRef.current) {
                const newMessage = data?.data[data?.data.length - 1];
                const isFromUser = newMessage.user_id === user?.id;

                if (isFromUser) {
                    scrollToEnd();
                } else {
                    sendNotification(newMessage);
                }
            }

            // Update the ref with current data
            prevDataRef.current = JSON.stringify(data.data);
        }
    }, [data, selectedThread]);

    return (
        <div ref={scrollRef} className={`${className} flex flex-col-reverse overflow-y-auto scroll-smooth motion-reduce:scroll-auto`}>
            {/* // ? Notice that the order of components is reversed because of 'flex-col-reverse' */}
            {/* Messages */}
            <div className="message-container">
                {isLoading ? (
                    <Loader className="grid place-content-center" />
                ) : (
                    data?.data && data.data.map((msg, index, arr) => {
                        const prevMsg = index > 0 ? arr[index - 1] : null;
                        return (
                            <MessageBox key={index} className="px-4 py-2" message={msg}
                                        prevUserId={prevMsg ? prevMsg.user_id : null}
                                        prevUpdatedAt={prevMsg ? prevMsg.updatedAt : null} />
                        );
                    })
                )}
            </div>

            {/* Welcome Message */}
            {selectedThread && (
                <section className="my-6 px-4">
                    <div className="flex items-center justify-center mb-3 size-16 rounded-full bg-primary shadow-lg">
                        <FontAwesomeIcon className="text-600" icon={faHashtag} />
                    </div>
                    <h2>Welcome to #{selectedThread?.name}!</h2>
                    <span className="text-300 text-gray-500">This is the start of the #{selectedThread?.name} thread.</span>
                </section>
            )}
        </div>
    );
}