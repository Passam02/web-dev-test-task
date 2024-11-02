import React, { useState, useEffect } from 'react';
import "../styles/CustomSelect.css"

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Element; // Assert the type to Element
        if (!target.closest('.custom-select')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="custom-select">
            <div className="selected-value" onClick={toggleDropdown}>
                {selectedValue || 'Pokaż wszystkie'}
            </div>
            {isOpen && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="option"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;