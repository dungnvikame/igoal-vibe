import * as React from "react";
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "error" | "info";
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    onClose?: () => void;
    action?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
export { Alert };
