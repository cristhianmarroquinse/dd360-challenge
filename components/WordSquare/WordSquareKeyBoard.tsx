import { useGlobalContext } from "@/context/store";
import { Themes } from "@/types/enums";
import { useTheme } from "next-themes";
import WordSquare from "@/components/WordSquare/WordSquare";

interface WordSquareKeyBoardProps {
    value: string;
    size: number;
}

const WordSquareKeyBoard: React.FC<WordSquareKeyBoardProps> = ({ value, size }) => {
    const {
        IN_PLACE_COLOR,
        WRONG_PLACE_COLOR,
        WRONG_WORD_COLOR,
        wordsArray,
        setWordsArray,
        inPlaceKeys,
        wrongPlaceKeys,
        wrongKeys,
        currentPosition,
    } = useGlobalContext();

    const {theme} = useTheme();

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

    return (
        <WordSquare
            containerStyle={{
                backgroundColor: getKeyBackgroundColor(),
                height: `${size+6}px`,
                width: `${size}px`,
            }}
            containerClassName={`rounded-md`}
            containerOnClick={() => {
                if(value !== 'ENTER' && value !== '⌫'){
                    setWordsArray([...wordsArray.slice(0, currentPosition), value, ...wordsArray.slice(currentPosition + 1)]);
                }
            }}
            inputStyle={{
                height: `${size+6}px`,
                width: `${size}px`,
                color: getKeyFontColor(),
            }}
            inputClassName={`focus:outline-none cursor-pointer text-center dark:text-white text-black text-xl font-extrabold`}
            inputType='text'
            inputValue={value}
            inputDisabled={true}
        />
    )

}

export default WordSquareKeyBoard;