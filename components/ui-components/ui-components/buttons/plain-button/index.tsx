import { ReactNode, useRef } from "react";

import classes from './plain-button.module.scss'

interface Props {
    isActive?: boolean;
    isDisabled?: boolean;
    children: ReactNode;
    clickEvent?: Function;
    defaultClass?: string;
    activeClass?: string;
    className?: string;
    style?: object;
    title?: string;
}

const PlainButton = ({ isActive = false, isDisabled = false, children, clickEvent = () => {}, defaultClass, activeClass, className, style, title = '' }: Props) => {
    /**
     * DOM элемент для сняти фокуса
     * @type {React.MutableRefObject<undefined>}
     */
    const buttonElement = useRef<HTMLDivElement | null | any>(null);

    return (
        <button
            ref={buttonElement}
            title={title}
            style={{
                ...style,
                opacity: isDisabled ? '0.5' : '1'
            }}
            disabled={isDisabled}
            onClick={() => {clickEvent(); buttonElement?.current?.focus()}}
            className={`${classes.button__default} ${isActive ? `${classes.button__active} ${activeClass}` : defaultClass} ${className} button__regular-text`}
            onMouseLeave={() => buttonElement?.current?.blur()}
        >
            {children}
        </button>
    );
};

export default PlainButton;
