"use client";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { PopupContext } from "@/app/utils/popup";
import { axiosFetcher } from "@/app/utils/fetcher";
import { v4 as uuidv4 } from "uuid";

// UI
import Modal from "@/app/ui/modal";
import { FormInput, FormSubmit, Toggle } from "@/app/ui/form";
import { ButtonSolid, ButtonOutline } from "@/app/ui/button";



export default function ThreadCreateModal({ closeModal }) {
    const session = useSession();
    const user = session.data?.user;

    const { addPopupMessage } = useContext(PopupContext);
    const [isPublic, setIsPublic] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(e.target);
            const threadName = formData.get("name");
            const threadSlogan = formData.get("slogan");
            const threadIsPublic = formData.get("public") === "on";
            const threadData = {
                thread_id: uuidv4(),
                name: threadName,
                slogan: threadSlogan,
                public: threadIsPublic,
                members: [{
                    user_id: user.id,
                    name: user.name,
                    image: user.image,
                }],
            }

            const res = await axiosFetcher("/api/threads",  {
                method: "POST",
                data: threadData,
            });

            closeModal();
            if (res.level === "log") {
                console.log(res.message);
            } else {
                addPopupMessage({ message: res.message, level: res.level });
            }
        } catch (error) {
            addPopupMessage({ message: error.message, level: error.level });
        }
    }

    return (
        <Modal closeModal={closeModal}>
            <h2 className="mb-6">Wanna chat?</h2>
            <FormSubmit id="form-create-thread" handleSubmit={handleSubmit}>
                <FormInput id="thread-name" name="name" placeholder="New thread name" required />
                <FormInput id="thread-slogan" name="slogan" placeholder="Thread slogan" required />
                <Toggle id="thread-public" name="public" label="Public" checked={isPublic} handleChange={setIsPublic} />
                <div className="flex gap-4 mt-6 justify-center">
                    <ButtonSolid type="submit">
                        <span>Submit</span>
                    </ButtonSolid>
                    <ButtonOutline type="button" onClick={closeModal}>
                        <span>Cancel</span>
                    </ButtonOutline>
                </div>
            </FormSubmit>
        </Modal>
    );
}