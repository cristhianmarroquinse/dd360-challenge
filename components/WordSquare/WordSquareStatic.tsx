import { Themes } from "@/types/enums";
import { useTheme } from "next-themes";
import WordSquare from "@/components/WordSquare/WordSquare";

interface WordSquareProps {
    value: string;
    color: string;
    bordered: boolean;
    size: number;
}

const WordSquareStatic: React.FC<WordSquareProps> = ({ value, color, bordered, size }) => {

    const {theme} = useTheme();

    const bgColor = (theme === Themes.Dark && color === '#FFF') ? '#262B3C' : color;

    return (
        <WordSquare
            containerStyle={{ 
                backgroundColor: `${bgColor}`,
                height: `${size}px`,
                width: `${size}px`,
            }}
            containerClassName={`m-3 rounded-md ${bordered && 'border-[1px] border-black'}`}
            inputStyle={{ 
                height: `${size}px`,
                width: `${size}px`,
            }}
            inputClassName={`focus:outline-none text-center bg-transparent dark:text-white text-black text-3xl font-extrabold`}
            inputType='text'
            inputValue={value}
            inputDisabled={true}
        />
    )
}

export default WordSquareStatic;