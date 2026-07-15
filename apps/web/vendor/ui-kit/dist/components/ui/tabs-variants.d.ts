import { VariantProps } from 'class-variance-authority';
export declare const tabsListVariants: (props?: ({
    variant?: "default" | "borderless" | "underline" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const tabsTriggerVariants: (props?: ({
    variant?: "default" | "borderless" | "underline" | null | undefined;
    color?: "primary" | "orange" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
export type TabsColor = NonNullable<VariantProps<typeof tabsTriggerVariants>["color"]>;
export declare const tabsContentVariants: (props?: import('class-variance-authority/types').ClassProp | undefined) => string;
