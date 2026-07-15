import { Dialog } from 'radix-ui';
import * as React from "react";
export interface ModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    "aria-label"?: string;
    className?: string;
    bodyClassName?: string;
    variant?: "default" | "spotlight";
}
declare const Modal: {
    ({ open, onOpenChange, trigger, title, description, children, footer, size, showCloseButton, closeOnOverlayClick, "aria-label": ariaLabel, className, bodyClassName, variant, }: ModalProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ModalTrigger: React.ForwardRefExoticComponent<Dialog.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export { Modal, ModalTrigger };
