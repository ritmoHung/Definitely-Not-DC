"use client";
import { useContext, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { PopupContext } from "@/app/utils/popup";
import { axiosFetcher } from "@/app/utils/fetcher";
import { v4 as uuidv4 } from "uuid";

// Recoil
import { useRecoilValue } from "recoil";
import { threadAtom } from "@/app/utils/providers";

// UI
import { FormSubmit } from "@/app/ui/form";
import { ButtonTrans, ButtonSolid } from "@/app/ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";



export default function ChatInput({ className }) {
    const session = useSession();

    const { addPopupMessage } = useContext(PopupContext);
    const selectedThread = useRecoilValue(threadAtom);

    const textareaRef = useRef(null);
    const [input, setInput] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const disabled = isEmpty || isSending;

    function handleResize() {
        const tx = textareaRef.current;
        tx.style.height = 0;
        tx.style.height = tx.scrollHeight + "px";
    }

    function resetSize() {
        const tx = textareaRef.current;
        tx.style.height = "auto";
    }

    function handleChange(e) {
        setInput(e.target.value)
        handleResize();
        setIsEmpty(e.target.value.trim() === "");
    }

    function handleCompositionStart() {
        setIsComposing(true);
    }
    
    function handleCompositionEnd() {
        setIsComposing(false);
    }

    function handleKeyDown(e) {
        if(e.key === "Enter" && !e.shiftKey && !isComposing) {
            e.preventDefault();
            if (disabled) return;

            handleSubmit(e);
        }
    }

    function resetInput() {
        setInput("");
        setIsEmpty(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSending(true);
        
        try {
            const messageData = {
                message_id: uuidv4(),
                thread_id: selectedThread.thread_id,
                user_id: session.data?.user.id,
                content: input,
            }

            const res = await axiosFetcher("/api/messages",  {
                method: "POST",
                data: messageData,
            });

            resetSize();
            resetInput();
            setIsSending(false);
            if (res.level !== "log" && res.level !== "info") {
                addPopupMessage({ message: res.message, level: res.level });
            }
        } catch (error) {
            setIsSending(false);
            addPopupMessage({ message: error.message, level: error.level });
        }
    }

    return (
        <div className={`${className} grid`}>
            <FormSubmit className="grid-cols-[auto_1fr_auto]" handleSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <ImageButton />
                </div>
                <textarea
                    ref={textareaRef}
                    className="self-end input-border-rounded block w-full max-h-32 resize-none
                               py-[0.65rem] min-h-11 sm:min-h-12 placeholder:text-nowrap"
                    data-size="lg"
                    value={input}
                    rows={1}
                    placeholder="Send a message…"
                    onChange={handleChange}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onKeyDown={handleKeyDown}
                    disabled={!selectedThread}
                />
                <div className="flex gap-2">
                    <SendButton disabled={disabled} />
                </div>
            </FormSubmit>
        </div>
    );
}

function ImageButton({ className, ...props }) {
    function handleClick() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const imageWindow = window.open("");
                        imageWindow.document.write(`<img src="${img.src}" alt="Loaded Image"/>`);
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        };

        input.click();
    }

    return (
        <ButtonTrans title="Add image" size="lg" className={`${className}`}
                     onClick={handleClick} {...props} square>
            <FontAwesomeIcon icon={faImage} />
        </ButtonTrans>
    );
}

function SendButton({ className, ...props }) {
    return (
        <ButtonSolid type="submit" title="Send message" size="lg" {...props} square>
            <MingcuteSendPlaneFill />
        </ButtonSolid>
    );
}

export function MingcuteSendPlaneFill(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <g fill="none">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path><path fill="currentColor" d="m21.433 4.861l-6 15.5a1 1 0 0 1-1.624.362l-3.382-3.235l-2.074 2.073a.5.5 0 0 1-.853-.354v-4.519L2.309 9.723a1 1 0 0 1 .442-1.691l17.5-4.5a1 1 0 0 1 1.181 1.329ZM19 6.001L8.032 13.152l1.735 1.66L19 6Z"></path>
            </g>
        </svg>
    )
}