import React from 'react';

interface ButtonProps {
    name: string;
    onClick?: () => void;
    addedClasses?: string;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
}

const PrimaryButton: React.FC<ButtonProps> = ({ name, type, disabled, addedClasses, onClick }) => {
    return (
        <button
            className={`${addedClasses} p-1 bg-orange-500 hover:bg-orange-600 text-black`}
            disabled={disabled}
            onClick={onClick}
            type={type || 'button'}
        >
            {name}
        </button>
    );
};

export default PrimaryButton;
