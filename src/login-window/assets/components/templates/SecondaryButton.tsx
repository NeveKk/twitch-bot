import React from 'react';

interface ButtonProps {
    name: string;
    onClick: () => void;
    addedClasses?: string;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
}

const SecondaryButton: React.FC<ButtonProps> = ({ name, type, disabled, addedClasses, onClick }) => {
    return (
        <button
            className={`${addedClasses} p-1 bg-secondary text-white`}
            type={type || 'button'}
            disabled={disabled}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default SecondaryButton;
