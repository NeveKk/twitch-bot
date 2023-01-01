import React from 'react';

interface ButtonProps {
    name: string;
    onClick: () => void;
    addedClasses?: string;
    disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ name, disabled, addedClasses, onClick }) => {
    return (
        <button
            className={`${addedClasses} p-1 bg-primary hover:bg-secondary text-white`}
            disabled={disabled}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

export default PrimaryButton;
