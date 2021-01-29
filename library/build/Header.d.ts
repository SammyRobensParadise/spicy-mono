import PropTypes from "prop-types";
import "./header.css";
export declare const Header: {
    ({ user, onLogin, onLogout, onCreateAccount }: {
        user: any;
        onLogin: any;
        onLogout: any;
        onCreateAccount: any;
    }): JSX.Element;
    propTypes: {
        user: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        onLogin: PropTypes.Validator<(...args: any[]) => any>;
        onLogout: PropTypes.Validator<(...args: any[]) => any>;
        onCreateAccount: PropTypes.Validator<(...args: any[]) => any>;
    };
    defaultProps: {
        user: any;
    };
};
