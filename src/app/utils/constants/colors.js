import colors from "@/app/scss/colors.module.scss";

export const themes = JSON.parse(colors.themes.replace(/^'|'$/g, ''));
export const palettes = JSON.parse(colors.palettes.replace(/^'|'$/g, ''));