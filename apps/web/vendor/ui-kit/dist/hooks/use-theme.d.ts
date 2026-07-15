import * as React from "react";
export declare const themes: readonly ["light", "high-contrast-light", "olive", "dark", "deep-forest", "sunset"];
export type ThemeName = (typeof themes)[number];
type ThemeOptions = {
    defaultValue?: ThemeName;
    storageKey?: string;
};
export declare function useTheme(options?: ThemeOptions): {
    theme: "light" | "olive" | "dark" | "high-contrast-light" | "deep-forest" | "sunset";
    setTheme: React.Dispatch<React.SetStateAction<"light" | "olive" | "dark" | "high-contrast-light" | "deep-forest" | "sunset">>;
    themes: readonly ["light", "high-contrast-light", "olive", "dark", "deep-forest", "sunset"];
};
export {};
