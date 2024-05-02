import { useState, useContext } from "react";
import { ThemeContext } from "@/app/utils/providers";
import { themes, palettes } from "@/app/utils/constants/colors";

// Components
import { ButtonTrans } from "../ui/button";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faSwatchbook, faDroplet, faAngleDown } from "@fortawesome/free-solid-svg-icons";



export function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    function changeTheme() {
        switch (theme) {
            case "light":
                setTheme("dark");
                break;
            case "dark":
                setTheme("light");
                break;
        }
    }

    return (
        <ButtonTrans title="Theme toggle" className="text-300" onClick={changeTheme} square>
            {theme === "light" && <FontAwesomeIcon icon={faSun} />}
            {theme === "dark" && <FontAwesomeIcon icon={faMoon} />}
        </ButtonTrans>
    );
}

export function PaletteToggle() {
    const { palette, setPalette } = useContext(ThemeContext);

    function changePalette() {
        switch (palette) {
            case "discord":
                setPalette("citrus");
                break;
            case "citrus":
                setPalette("discord");
                break;
        }
    }

    return (
        <ButtonTrans title="Palette toggle" className="text-300" onClick={changePalette} square>
            <FontAwesomeIcon icon={faDroplet} />
        </ButtonTrans>
    );
}

function capitalized(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
function capitalizedItem(wordList) {
    return wordList.map(capitalized).join(" ");
}

function getIconByTheme(theme) {
    switch (theme) {
        case "light":
            return <FontAwesomeIcon icon={faSun} className="place-self-center" />;
        case "dark":
            return <FontAwesomeIcon icon={faMoon} className="place-self-center" />
        default:
            return <FontAwesomeIcon icon={faSwatchbook} className="place-self-center" />;
    }
}

export function ThemeSelect() {
    const { theme, setTheme } = useContext(ThemeContext);
    const [showThemes, setShowThemes] = useState(false);

    return (
        <div className="relative text-300">
            <button title={`${showThemes ? "Close" : "Show"} theme menu`} onClick={() => setShowThemes(prevState => !prevState)}
                    className="tile-border-rounded-sm flex items-center justify-between w-[clamp(8rem,_30vw,_12rem)] gap-2">
                {capitalizedItem(theme.split("-"))}
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {showThemes && (
                <div className="absolute -top-4 right-0 tile-border-rounded-sm grid gap-2 w-full !p-2 z-10 -translate-y-full">
                    {themes.map((theme, index) => (
                        <button key={index} className="tile-rounded-trans-xs grid grid-cols-[2ch_auto] items-center gap-4 text-left" onClick={() => {setTheme(theme); setShowThemes(false)}}>
                            {getIconByTheme(theme)}
                            {capitalizedItem(theme.split("-"))}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
export function PaletteSelect() {
    const { palette, setPalette } = useContext(ThemeContext);
    const [showPalettes, setShowPalettes] = useState(false);

    return (
        <div className="relative text-300">
            <button title={`${showPalettes ? "Close" : "Show"} palette menu`} onClick={() => setShowPalettes(prevState => !prevState)}
                    className="tile-border-rounded-accent-sm flex items-center justify-between w-[clamp(8rem,_30vw,_12rem)] gap-2">
                {capitalizedItem(palette.split("-"))}
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {showPalettes && (
                <div className="absolute -top-4 right-0 tile-border-rounded-sm grid gap-2 w-full !p-2 z-10 -translate-y-full">
                    {palettes.map((palette, index) => (
                        <button key={index} className="tile-rounded-trans-xs text-left" onClick={() => {setPalette(palette); setShowPalettes(false)}}>
                            {capitalizedItem(palette.split("-"))}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}