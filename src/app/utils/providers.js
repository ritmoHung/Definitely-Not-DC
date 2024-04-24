"use client";
import { useState, useEffect, createContext } from "react";
import { themes, palettes } from "@/app/utils/constants/colors";

// SWR
import { SWRConfig } from "swr";

// Popup
import { PopupProvider } from "./popup";



export default function Providers({ children }) {
    return (
        <ThemeProvider>
            <PopupProvider>
                <SWRConfig value={{ errorRetryInterval: 10000, errorRetryCount: 3 }}>
                    {children}
                </SWRConfig>
            </PopupProvider>
        </ThemeProvider>
    );
}



/* ---------------------------- THEME ---------------------------- */
export const ThemeContext = createContext(null);

// TODO: Add initial theme to body
function ThemeProvider({ children }) {
    let localTheme, localPalette;
    if (typeof window !== "undefined") {
        localTheme = localStorage.getItem("globalTheme");
        localPalette = localStorage.getItem("globalPalette");
    }

    const [theme, setTheme] = useState(localTheme || themes[0]);
    const [palette, setPalette] = useState(localPalette || palettes[0]);

    useEffect(() => {
        // Update local storage & class
        localStorage.setItem("globalTheme", theme);
        document.body.classList.add(`theme--${theme}`);

        // Update color-scheme property
        const colorScheme = theme === "dawn" ? "light" : "dark";
        document.documentElement.style.colorScheme = colorScheme;

        // Remove previous class
        return () => {
            document.body.classList.remove(`theme--${theme}`);
        }
    }, [theme]);

    useEffect(() => {
        // Update local storage & class
        localStorage.setItem("globalPalette", palette);
        document.body.classList.add(`palette--${palette}`);

        // Remove previous class
        return () => {
            document.body.classList.remove(`palette--${palette}`);
        };
    }, [palette]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, palette, setPalette }}>
            {children}
        </ThemeContext.Provider>
    );
}