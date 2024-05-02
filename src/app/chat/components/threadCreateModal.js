"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "@/app/utils/popup";
import { v4 as uuidv4 } from "uuid";

// SWR
import useSWR, { mutate } from "swr";
import { axiosFetcher } from "@/app/utils/fetcher";

// UI
import Modal from "@/app/ui/modal";
import { FormInput, FormSubmit, Toggle } from "@/app/ui/form";
import { ButtonTrans, ButtonSolid, ButtonOutline } from "@/app/ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/app/components/loader";



export default function ThreadCreateModal({ closeModal }) {
    const session = useSession();
    const user = session.data?.user;

    const { addPopupMessage } = useContext(PopupContext);
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    
    function handleRemoveMember(accountId) {
        setSelectedMembers(prevMembers => prevMembers.filter(member => member.account_id !== accountId));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(e.target);
            const threadIsPublic = formData.get("public") === "on";
            const threadName = formData.get("name");
            const threadSlogan = formData.get("slogan");
            if (threadName.length < 3 || threadSlogan.length < 3) {
                throw new Error("Name and slogan must be at least 3 characters long.");
            }

            const threadData = {
                thread_id: uuidv4(),
                creator_id: user.id,
                public: threadIsPublic,
                name: threadName,
                slogan: threadSlogan,
                members: threadIsPublic
                    ? []
                    : [user.aid, ...selectedMembers.map(member => member.account_id)],
            }

            const res = await axiosFetcher("/api/threads",  {
                method: "POST",
                data: threadData,
            });

            closeModal();
            mutate(`/api/threads/?user_id=${user?.id}`);
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
            <h2 className="mb-4">Not satisfied? Create one!</h2>
            <FormSubmit id="form-create-thread" handleSubmit={handleSubmit}>
                <FormInput id="thread-name" name="name" placeholder="New name..." required
                           value={name} onInput={(e) => setName(e.target.value.slice(0, 30))} />
                <FormInput id="thread-slogan" name="slogan" placeholder="Slogan..." required
                           value={slogan} onInput={(e) => setSlogan(e.target.value.slice(0, 60))} />
                <Toggle id="thread-public" name="public" label="Public" checked={isPublic} handleChange={setIsPublic} />
                {!isPublic && (
                    <div className="mt-3">
                        <h3 className="mb-3">Add your friends!</h3>
                        <SearchUserInput selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
                        {selectedMembers.length !== 0 && (
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {selectedMembers.map(member => (
                                    <div key={member.account_id} className="inline-flex gap-1 my-2 px-2 py-1 text-300 bg-primary !rounded-full">
                                        <span>{member.name}</span>
                                        <ButtonTrans size="xs" className="!rounded-full" square onClick={() => handleRemoveMember(member.account_id)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </ButtonTrans>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
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

function SearchUserInput({ selectedMembers, setSelectedMembers }) {
    const session = useSession();
    const user = session.data?.user;

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [searchResults, setSearchResults] = useState([]);

    const { data, isLoading, error } = useSWR(
        () => (debouncedQuery) ? `/api/users/?query=${encodeURIComponent(debouncedQuery)}` : null,
        axiosFetcher
    );

    // Debounce input
    useEffect(() => {
        if (!query) setSearchResults([]);
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Filter search result by already selected member list & user itself
    useEffect(() => {
        if (data?.data) {
            const filteredResults = data?.data.filter(foundUser => isValidEntry(foundUser));
            setSearchResults(filteredResults);
        }
    }, [data]);

    function isValidEntry(selectedUser) {
        return !selectedMembers.some(member => selectedUser.account_id === member.account_id)
            && selectedUser.account_id !== user?.aid;
    }

    function handleSelectUser(selectedUser) {
        if (!isValidEntry(selectedUser)) return;
        setSelectedMembers(prevMembers => [...prevMembers, selectedUser]);
        setQuery("");
    }

    return (
        <div className="dropdown-layout" data-empty={!query && searchResults.length === 0}>
            <FormInput id="search-user" className="w-full" name="search-user" placeholder="Search user..."
                       value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="dropdown-container" data-type="full">
                <ul className="dropdown tile-border-rounded-even-sm max-h-64 overflow-y-auto">
                    {isLoading ? (
                        <Loader className="grid place-content-center" size="sm" />
                    ) : (
                        searchResults.length === 0 ? (
                            <div className="tile-rounded-trans-xs">No results</div>
                        ) : (
                            searchResults.map(foundUser => (
                                <li key={foundUser.account_id} onClick={() => handleSelectUser(foundUser)}
                                    className="tile-rounded-trans-xs grid cursor-pointer hover:bg-gray-500 hover:bg-opacity-10">
                                    <span>{foundUser.name}</span>
                                    <span className="text-gray-500 text-300">@{foundUser.account_id}</span>
                                </li>
                            ))
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}