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
        inPlaceKeys,
        wrongPlaceKeys,
        wrongKeys,
        wordsArrayRefs,
        currentPosition,
        setCurrentPosition
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

    const getKeyBackgroundColor = () => {
        if(theme === Themes.Light){
            if(inPlaceKeys.includes(value)) return IN_PLACE_COLOR;
            if(wrongPlaceKeys.includes(value)) return WRONG_PLACE_COLOR;
            if(wrongKeys.includes(value)) return WRONG_WORD_COLOR;
            return '#D3D6DA'
        }
        if(theme === Themes.Dark){ 
            if(inPlaceKeys.includes(value)) return IN_PLACE_COLOR;
            if(wrongPlaceKeys.includes(value)) return WRONG_PLACE_COLOR;
            if(wrongKeys.includes(value)) return WRONG_WORD_COLOR;
            return '#565F7E'
        }
        return '#D3D6DA'
    }

    const getKeyFontColor = () => {
        if(theme === Themes.Light){
            if(inPlaceKeys.includes(value)) return '#FFF';
            if(wrongPlaceKeys.includes(value)) return '#FFF';
            if(wrongKeys.includes(value)) return '#FFF';
            return '#000'
        }
        if(theme === Themes.Dark){
            return '#FFF'
        }
        return '#000'
    }

    if(variant === WordSquareVariants.MainBoard) {
        return (
            <div 
                style={{ 
                    backgroundColor: setColor(),
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
                    className={`focus:outline-none text-center bg-transparent text-white text-3xl font-extrabold`}
                    ref={(e) => {
                        if (e && !wordsArrayRefs.current.includes(e)) {
                            wordsArrayRefs.current.push(e);
                        }
                    }}
                    onKeyUp={(e) => {
                        if(e.key === 'Backspace' && position > 0){
                            wordsArrayRefs.current[position - 1].focus();
                        } else {
                            wordsArrayRefs.current[position + 1]?.focus();
                        }
                    }}
                    onFocus={() => setCurrentPosition(position)}
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

    if(variant === WordSquareVariants.KeyBoard){
        return (
            <div 
                style={{ 
                    backgroundColor: getKeyBackgroundColor(),
                    height: `${size+6}px`,
                    width: `${size}px`,
                }}
                className={`rounded-md ${bordered && 'border-[1px] border-black'}`}
                onClick={() => {
                    setWordsArray([...wordsArray.slice(0, currentPosition), value, ...wordsArray.slice(currentPosition + 1)]);
                }}
            >
                <input 
                    style={{
                        height: `${size+6}px`,
                        width: `${size}px`,
                        color: getKeyFontColor(),
                    }} 
                    className={`focus:outline-none cursor-pointer text-center dark:text-white text-black text-xl font-extrabold`}
                    type='text'
                    value={value} 
                    disabled
                />
            </div>
        )
    }
}

export default WordSquare;