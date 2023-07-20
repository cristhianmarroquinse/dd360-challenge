'use client'

import { useGlobalContext } from "@/context/store";
import { Themes, WordSquareVariants } from "@/types/enums";
import { useTheme } from "next-themes";

interface WordSquareProps {
    variant: WordSquareVariants;
    value: string;
    position?: number;
    color?: string;
    bordered?: boolean;
    size: number;
}

const WordSquare: React.FC<WordSquareProps> = ({ variant, value, position = 0, color = '', bordered = false, size }) => {
    const {
        COLUMNS,
        UNPLAYED_COLOR,
        IN_PLACE_COLOR,
        WRONG_PLACE_COLOR,
        WRONG_WORD_COLOR,
        wordsArray,
        setWordsArray,
        currentRow,
        currentWord,
        isGameOnHold,
    } = useGlobalContext();

    const {theme} = useTheme();

    const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = '';
        const str = event.target.value;
        if (event.target.value.length > 0) {
            newValue = str.charAt(str.length - 1);
        }
        const newWordsArray = [...wordsArray];
        newWordsArray[position] = newValue.toUpperCase();
        setWordsArray([...newWordsArray]);
    }

    const setColor = () => {
        if (Math.floor(position / COLUMNS) >= currentRow)return UNPLAYED_COLOR;
        const currentWordIndex = position % COLUMNS;
        if(value === currentWord.charAt(currentWordIndex)) return IN_PLACE_COLOR;
        if(currentWord.includes(value)) return WRONG_PLACE_COLOR;
        return WRONG_WORD_COLOR;
    }

    if(variant === WordSquareVariants.MainBoard) {
        return (
            <div 
                style={{ 
                    backgroundColor: `${setColor()}`,
                    height: `${size}px`,
                    width: `${size}px`,
                }} 
                className={`rounded-md ${bordered && 'border-[1px] border-black'}`}
            >
                <input
                    style={{ 
                        height: `${size}px`,
                        width: `${size}px`,
                    }} 
                    className={`focus:outline-none text-center bg-transparent text-white text-4xl font-extrabold`}
                    type='text' 
                    onChange={handleChangeWord} 
                    value={value} 
                    disabled={Math.floor(position / 5) !== currentRow || isGameOnHold}
                />
            </div>
        )
    }

    if(variant === WordSquareVariants.Static){

        const bgColor = (theme === Themes.Dark && color === '#FFF') ? '#262B3C' : color;

        return (
            <div 
                style={{ 
                    backgroundColor: `${bgColor}`,
                    height: `${size}px`,
                    width: `${size}px`,
                }}
                className={`m-3 rounded-md ${bordered && 'border-[1px] border-black'}`}
            >
                <input 
                    style={{ 
                        height: `${size}px`,
                        width: `${size}px`,
                    }} 
                    className={`focus:outline-none text-center bg-transparent dark:text-white text-black text-3xl font-extrabold`}
                    type='text'
                    value={value} 
                    disabled={true}
                />
            </div>
        )
    }

    
}

export default WordSquare;