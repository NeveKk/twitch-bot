import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons/lib/esm/iconContext';

interface ButtonProps {
    icon: ReactNode;
    onClick: () => void;
    addedClasses?: string;
    disabled?: boolean;
}

const iconContextValue = { color: '#4B286D' };

const SecondaryIconButton: React.FC<ButtonProps> = ({ icon, disabled, addedClasses, onClick }) => {
    return (
        <button
            className={`${addedClasses} p-0 mr-1 bg-white text-3xl rounded-lg`}
            disabled={disabled}
            onClick={onClick}
        >
            <IconContext.Provider value={iconContextValue}>{icon}</IconContext.Provider>
        </button>
    );
};

export default SecondaryIconButton;
