import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons/lib/esm/iconContext';

interface ButtonProps {
    icon: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    addedClasses?: string;
    disabled?: boolean;
    newContextValue?: { color: string };
    title?: string;
    type?: 'button' | 'reset' | 'submit';
}

const iconContextValue = { color: '#2B8000' };

const PrimaryIconButton: React.FC<ButtonProps> = ({
    icon,
    type,
    disabled,
    addedClasses,
    newContextValue,
    title,
    onClick
}) => {
    return (
        <button
            className={`${addedClasses} p-0 mr-1 bg-white text-3xl rounded-lg`}
            disabled={disabled}
            onClick={onClick}
            title={title}
            type={type || 'button'}
        >
            <IconContext.Provider value={newContextValue || iconContextValue}>{icon}</IconContext.Provider>
        </button>
    );
};

export default PrimaryIconButton;
