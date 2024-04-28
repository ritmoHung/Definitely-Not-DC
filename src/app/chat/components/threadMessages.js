"use client";

// Recoil
import { useRecoilValue } from "recoil";
import { threadAtom } from "@/app/utils/providers";

// SWR
import useSWR from "swr";
import { axiosFetcher } from "@/app/utils/fetcher";

// Components
import MessageBox from "./messageBox";



export default function ThreadMessages({ className }) {
    const selectedThread = useRecoilValue(threadAtom);

    const { data, isLoading, error } = useSWR(
        () => (selectedThread?.thread_id) ? `/api/messages/?thread_id=${selectedThread?.thread_id}` : null,
        axiosFetcher,
        { refreshInterval: 500 }
    );

    return (
        <div className={`${className} overflow-y-auto motion-reduce:scroll-auto`}>
            {selectedThread && (
                <section className="mb-6">
                    <h2>Welcome to #{selectedThread?.name}!</h2>
                    <span className="text-300 text-gray-500">This is the start of the #{selectedThread?.name} thread.</span>
                </section>
            )}
            <div className="message-container">
                {data?.data && data.data.map((msg, index) => (
                    <MessageBox key={index} message={msg} />
                ))}
            </div>
        </div>
    );
}