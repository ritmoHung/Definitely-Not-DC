"use client";
import { useState, useEffect, createContext, useContext } from "react";



export const PopupContext = createContext();

export function PopupProvider({ children }) {
    const [popups, setPopups] = useState([]);

    function addPopupMessage({ message, level = "info", duration = 5 }) {
        const id = Date.now();
        setPopups(current => [...current, { id, level, message, duration }]);
    };
    
    function removePopupMessage(id) {
        setPopups(current => current.filter(popup => popup.id !== id));
    };

    return (
        <PopupContext.Provider value={{ popups, addPopupMessage, removePopupMessage }}>
            {children}
            <PopupContainer />
        </PopupContext.Provider>
    );
}

function PopupContainer() {
    const { popups, removePopupMessage } = useContext(PopupContext);
    return (
        <div id="popup-container" className="grid fixed right-0 bottom-0 w-[min(100vw,_30rem)] p-4 md:p-8 gap-2 pointer-events-none z-20 [&_>_*]:pointer-events-auto box-border">
            {popups.map(({ id, level, message, duration }) => (
                <PopupMessage key={id} message={message} level={level} duration={duration} removeSelf={() => removePopupMessage(id)} />
            ))}
        </div>
    );
}

function PopupMessage({ message, level, duration = 5, removeSelf }) {
    const [ show, setShow ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const delay = 0, transition = 0.5;

    useEffect(() => {
        setShow(true);

        const inTimer = setTimeout(() => {
            setVisible(true);
        }, 1000 * delay);

        const vTimer = setTimeout(() => {
            setVisible(false);
        }, 1000 * (duration - transition + delay));

        const sTimer = setTimeout(() => {
            removeSelf();
        }, 1000 * (duration + delay));

        return () => {
            clearTimeout(inTimer);
            clearTimeout(vTimer);
            clearTimeout(sTimer);
        }
    }, [message]);

    function getClassByLevel(level) {
        switch (level) {
            case "info":
                return "tile-border-rounded-accent";
            case "success":
                return "tile-border-rounded-green";
            case "warning":
                return "tile-border-rounded-amber";
            case "error":
                return "tile-border-rounded-red";
            default:
                return "tile-border-rounded-accent";
        }
    }

    if (!show) {
        return null;
    }

    return (
        <div className={`${getClassByLevel(level)} ${visible ? "opacity-100 translate-y-none" : "opacity-0 translate-y-full"} shadow-xl transition-in-quint transform-[500ms]`}>
            {message
        }</div>
    );
}