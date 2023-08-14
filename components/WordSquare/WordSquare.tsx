import React, { LegacyRef } from 'react';

interface WordSquareProps {
    containerStyle: React.CSSProperties;
    containerClassName: string;
    containerOnClick?: () => void;
    inputStyle: React.CSSProperties;
    inputClassName: string;
    inputRef?: LegacyRef<HTMLInputElement> | undefined;
    inputOnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    inputOnFocus?: () => void;
    inputType: string;
    inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    inputDisabled: boolean;
}

const WordSquare: React.FC<WordSquareProps> = ({
        containerStyle,
        containerClassName,
        containerOnClick,
        inputStyle,
        inputClassName,
        inputRef,
        inputOnKeyUp,
        inputOnFocus,
        inputType,
        inputOnChange,
        inputValue,
        inputDisabled
    }) => {

    return (
        <div 
            style={containerStyle} 
            className={containerClassName}
            onClick={containerOnClick}
        >
            <input
                style={inputStyle} 
                className={inputClassName}
                ref={inputRef}
                onKeyUp={inputOnKeyUp}
                onFocus={inputOnFocus}
                type={inputType} 
                onChange={inputOnChange}
                value={inputValue} 
                disabled={inputDisabled}
            />
        </div>
    )
}

export default WordSquare;