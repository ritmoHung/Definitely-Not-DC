"use client";

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



export default function ThreadMessages({ className }) {
    const selectedThread = useRecoilValue(threadAtom);

    const { data, isLoading, error } = useSWR(
        () => (selectedThread?.thread_id) ? `/api/messages/?thread_id=${selectedThread?.thread_id}` : null,
        axiosFetcher,
        { refreshInterval: 500 }
    );

    return (
        <div className={`${className} flex flex-col-reverse overflow-y-auto motion-reduce:scroll-auto`}>
            {/* // ? Notice that the order of components is reversed because of 'flex-col-reversed' */}
            <div className="message-container">
                {data?.data && data.data.map((msg, index) => (
                    <MessageBox key={index} message={msg} />
                ))}
            </div>
            {selectedThread && (
                <section className="my-6">
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