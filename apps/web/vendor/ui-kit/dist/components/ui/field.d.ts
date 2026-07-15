import * as React from "react";
type FieldControlProps = {
    id?: string;
    disabled?: boolean;
    required?: boolean;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean | "true" | "false";
};
export interface FieldProps extends Omit<React.ComponentProps<"div">, "children"> {
    label?: React.ReactNode;
    required?: boolean;
    supportingText?: React.ReactNode;
    error?: string;
    disabled?: boolean;
    htmlFor?: string;
    children: React.ReactElement<FieldControlProps>;
}
declare const Field: React.ForwardRefExoticComponent<Omit<FieldProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Field };
