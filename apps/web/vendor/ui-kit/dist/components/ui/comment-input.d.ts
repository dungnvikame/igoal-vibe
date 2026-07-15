import * as React from "react";
export interface CommentInputProps extends Omit<React.ComponentProps<"textarea">, "value" | "defaultValue" | "onChange" | "onSubmit"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onSubmit?: (value: string, event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    actionIcons?: React.ReactNode;
    avatar?: React.ReactNode;
}
declare const CommentInput: React.ForwardRefExoticComponent<Omit<CommentInputProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export { CommentInput };
