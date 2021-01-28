import PropTypes from 'prop-types';
import './button.css';
/**
 * Primary UI component for user interaction
 */
export declare const Button: {
    ({ primary, backgroundColor, size, label, ...props }: {
        [x: string]: any;
        primary: any;
        backgroundColor: any;
        size: any;
        label: any;
    }): JSX.Element;
    propTypes: {
        /**
         * Is this the principal call to action on the page?
         */
        primary: PropTypes.Requireable<boolean>;
        /**
         * What background color to use
         */
        backgroundColor: PropTypes.Requireable<string>;
        /**
         * How large should the button be?
         */
        size: PropTypes.Requireable<string>;
        /**
         * Button contents
         */
        label: PropTypes.Validator<string>;
        /**
         * Optional click handler
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        backgroundColor: any;
        primary: boolean;
        size: string;
        onClick: any;
    };
};
