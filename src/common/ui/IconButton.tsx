import React from 'react';
import clsx from 'clsx'
import styles from './CommonUI.module.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    size?: string;
    children: React.ReactElement;
    className?: string;
}
export default function IconButton(props: IconButtonProps): JSX.Element {
    const { size, children, className, ...restProps } = props;
    return (
        <button className={clsx(styles.iconButton, className)} {...restProps}>
            {children}
        </button>
    )
}