declare const _default: {
    title: string;
    component: {
        ({ user, onLogin, onLogout, onCreateAccount }: {
            user: any;
            onLogin: any;
            onLogout: any;
            onCreateAccount: any;
        }): JSX.Element;
        propTypes: {
            user: import("prop-types").Requireable<import("prop-types").InferProps<{}>>;
            onLogin: import("prop-types").Validator<(...args: any[]) => any>;
            onLogout: import("prop-types").Validator<(...args: any[]) => any>;
            onCreateAccount: import("prop-types").Validator<(...args: any[]) => any>;
        };
        defaultProps: {
            user: any;
        };
    };
};
export default _default;
export declare const LoggedIn: any;
export declare const LoggedOut: any;
