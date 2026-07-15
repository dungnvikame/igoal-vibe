import { VariantProps } from 'class-variance-authority';
import { spinnerVariants } from './spinner-variants';
import * as React from "react";
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof spinnerVariants> {
    label?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<SVGSVGElement>>;
export { Spinner };
