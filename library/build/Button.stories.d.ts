declare const _default: {
    title: string;
    component: {
        ({ primary, backgroundColor, size, label, ...props }: {
            [x: string]: any;
            primary: any;
            backgroundColor: any;
            size: any;
            label: any;
        }): JSX.Element;
        propTypes: {
            primary: import("prop-types").Requireable<boolean>;
            backgroundColor: import("prop-types").Requireable<string>;
            size: import("prop-types").Requireable<string>;
            label: import("prop-types").Validator<string>;
            onClick: import("prop-types").Requireable<(...args: any[]) => any>;
        };
        defaultProps: {
            backgroundColor: any;
            primary: boolean;
            size: string;
            onClick: any;
        };
    };
    argTypes: {
        backgroundColor: {
            control: string;
        };
    };
};
export default _default;
export declare const Primary: any;
export declare const Secondary: any;
export declare const Large: any;
export declare const Small: any;
