"use client";
import { useState } from "react";

// Recoil
import { atom, useRecoilValue } from "recoil";

// Components// Components & UI
import ThreadCreateModal from "./components/threadCreateModal";
import ThreadsSidebar from "./components/threadsSidebar";
import ThreadContent from "./components/threadContent";

export const sidebarExpand = atom({
    key: "sidebarExpand",
    default: false,
});

export default function Chat() {
    const expanded = useRecoilValue(sidebarExpand);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="chat-layout">
            {isModalOpen && <ThreadCreateModal closeModal={() => setIsModalOpen(false)} />}
            <ThreadsSidebar className="threads-sidebar" data-expanded={expanded} setIsModalOpen={setIsModalOpen} />
            <ThreadContent className="thread-content" data-expanded={expanded} />
        </div>
    );
}