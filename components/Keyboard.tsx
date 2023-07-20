import { WordSquareVariants } from "@/types/enums";
import WordSquare from "./WordSquare";

const Keyboard: React.FC = () => {

    const KeyboardKeys = [[
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'
    ], [
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'
    ], [
        'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'
    ]];

    return (
        <div className='bg-keyboard-bg dark:bg-keyboard-bg-dark m-auto mt-10 p-5 w-[550px] rounded-2xl'>
            {KeyboardKeys.map((row, index) => (
                <div 
                    className={`grid grid-cols-10 w-[460px] m-auto mt-1.5 ${index === 1 && 'mr-1'}`} key={index}>
                    {
                        row.map((key, index) => (
                            <WordSquare key={index} variant={WordSquareVariants.KeyBoard} value={key} position={index} size={40} />
                        ))
                    }
                </div>
                
            ))}
        </div>
    );
}

export default Keyboard;