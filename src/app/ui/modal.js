"use client";
import { useEffect } from "react";

export default function Modal({ children, closeModal }) {
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                closeModal();
            }
        }

        function handleOutsideClick(e) {
            if (e.target.classList.contains("modal-backdrop")) {
                closeModal();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("click", handleOutsideClick);
        }
    }, []);
    return (
        <div className="modal-backdrop fixed grid inset-0 place-content-center bg-black bg-opacity-75 z-20">
            <div className="tile-rounded-xl w-[clamp(15rem,_90vw,_25rem)]">
                {children}
            </div>
        </div>
    );
}