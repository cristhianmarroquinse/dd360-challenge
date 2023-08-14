import { useGlobalContext } from "@/context/store";
import WordSquare from "@/components/WordSquare/WordSquare";

interface WordSquareProps {
    value: string;
    position: number;
    size: number;
}

const WordSquareMainBoard: React.FC<WordSquareProps> = ({ value, position, size }) => {
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
        wordsArrayRefs,
        setCurrentPosition
    } = useGlobalContext();

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

    return (
        <WordSquare
            containerStyle={{ 
                backgroundColor: setColor(),
                height: `${size}px`,
                width: `${size}px`,
            }}
            containerClassName={`rounded-md`}
            inputStyle={{ 
                height: `${size}px`,
                width: `${size}px`,
            }}
            inputClassName={`focus:outline-none text-center bg-transparent text-white text-3xl font-extrabold`}
            inputRef={(e) => {
                if (e && !wordsArrayRefs.current.includes(e)) {
                    wordsArrayRefs.current.push(e);
                }
            }}
            inputOnKeyUp={(e) => {
                if(e.key === 'Backspace' && position > 0){
                    wordsArrayRefs.current[position - 1].focus();
                } else {
                    wordsArrayRefs.current[position + 1]?.focus();
                }
            }}
            inputOnFocus={() => setCurrentPosition(position)}
            inputType='text'
            inputOnChange={handleChangeWord}
            inputValue={value}
            inputDisabled={Math.floor(position / 5) !== currentRow || isGameOnHold}
        />
    )
}

export default WordSquareMainBoard;