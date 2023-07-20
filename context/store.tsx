'use client'

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';
import { Themes } from '@/types/enums';

interface ContextProps {
    COLUMNS: number;
    ROWS: number;
    UNPLAYED_COLOR: string;
    IN_PLACE_COLOR: string;
    WRONG_PLACE_COLOR: string;
    WRONG_WORD_COLOR: string;
    wordsArray: string[];
    setWordsArray: Dispatch<SetStateAction<string[]>>;
    isStatisticsModalOpen: boolean;
    setStatisticsModalOpen: Dispatch<SetStateAction<boolean>>;
    isInstructionsModalOpen: boolean;
    setIsInstructionsModalOpen: Dispatch<SetStateAction<boolean>>;
    playsCounter: number;
    setPlaysCounter: Dispatch<SetStateAction<number>>;
    victories: number;
    setVitories: Dispatch<SetStateAction<number>>;
    currentRow: number;
    setCurrentRow: Dispatch<SetStateAction<number>>;
    currentWord: string;
    setCurrentWord: Dispatch<SetStateAction<string>>;
    theme: Themes;
    setTheme: Dispatch<SetStateAction<Themes>>;
    wordsDictionary: string[];
    setWordsDictionary: Dispatch<SetStateAction<string[]>>;
    wordsPlayerd: string[];
    setWordsPlayerd: Dispatch<SetStateAction<string[]>>;
    isGameOnHold: boolean;
    setIsGameOnHold: Dispatch<SetStateAction<boolean>>;
    timer: number[];
    setTimer: Dispatch<SetStateAction<number[]>>;
    displayLastWord: boolean;
    setDisplayLastWord: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
    COLUMNS: 0,
    ROWS: 0,
    UNPLAYED_COLOR: '',
    IN_PLACE_COLOR: '',
    WRONG_PLACE_COLOR: '',
    WRONG_WORD_COLOR: '',
    wordsArray: [],
    setWordsArray: () => { },
    isStatisticsModalOpen: false,
    setStatisticsModalOpen: () => { },
    isInstructionsModalOpen: false,
    setIsInstructionsModalOpen: () => { },
    playsCounter: 0,
    setPlaysCounter: () => { },
    victories: 0,
    setVitories: () => { },
    currentRow: 0,
    setCurrentRow: () => { },
    currentWord: '',
    setCurrentWord: () => { },
    theme: Themes.Light,
    setTheme: () => { },
    wordsDictionary: [],
    setWordsDictionary: () => { },
    wordsPlayerd: [],
    setWordsPlayerd: () => { },
    isGameOnHold: false,
    setIsGameOnHold: () => { },
    timer: [],
    setTimer: () => { },
    displayLastWord: false,
    setDisplayLastWord: () => { },
});


export const GlobalContextProvider: React.FC<any> = ({ children }) => {
    const COLUMNS = 5;
    const ROWS = 5;
    const UNPLAYED_COLOR = '#939D9F4D';
    const IN_PLACE_COLOR = '#66A060';
    const WRONG_PLACE_COLOR = '#CEB02C';
    const WRONG_WORD_COLOR = '#939B9F';
    const [wordsArray, setWordsArray] = useState<string[]>(Array(ROWS*COLUMNS).fill(''));
    const [isStatisticsModalOpen, setStatisticsModalOpen] = useState<boolean>(false);
    const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState<boolean>(false);
    const [playsCounter, setPlaysCounter] = useState<number>(0);
    const [victories, setVitories] = useState<number>(0);
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [theme, setTheme] = useState<Themes>(Themes.Light);
    const [wordsDictionary, setWordsDictionary] = useState<string[]>([]);
    const [wordsPlayerd, setWordsPlayerd] = useState<string[]>([]);
    const [isGameOnHold, setIsGameOnHold] = useState<boolean>(false);
    const [timer, setTimer] = useState<number[]>([5, 0]);
    const [displayLastWord, setDisplayLastWord] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{
            COLUMNS,
            ROWS,
            UNPLAYED_COLOR,
            IN_PLACE_COLOR,
            WRONG_PLACE_COLOR,
            WRONG_WORD_COLOR,
            wordsArray,
            setWordsArray,
            isInstructionsModalOpen, 
            setIsInstructionsModalOpen, 
            isStatisticsModalOpen, 
            setStatisticsModalOpen, 
            playsCounter, 
            setPlaysCounter, 
            victories, 
            setVitories, 
            currentRow,
            setCurrentRow,
            currentWord,
            setCurrentWord,
            theme,
            setTheme,
            wordsDictionary,
            setWordsDictionary,
            wordsPlayerd,
            setWordsPlayerd,
            isGameOnHold,
            setIsGameOnHold,
            timer,
            setTimer,
            displayLastWord,
            setDisplayLastWord
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);