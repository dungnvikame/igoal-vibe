import * as React from "react";
type DarkModeOptions = {
    defaultValue?: boolean;
    storageKey?: string;
};
export declare function useDarkMode(options?: DarkModeOptions): {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
};
export {};
