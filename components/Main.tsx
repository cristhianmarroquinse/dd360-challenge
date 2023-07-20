'use client'

import { useEffect } from "react";
import { useGlobalContext } from "@/context/store";
import Header from "@/components/Header";
import Board from "@/components/Board";
import StatisticsModal from "@/components/StatisticsModal";
import InstructionsModal from "@/components/InstructionsModal";
import { useCountdown } from '@/hooks/useCountdown';
import { ThemeProvider } from 'next-themes'
import Keyboard from "@/components/Keyboard";

interface MainProps {
    words: string[];
}

const Main: React.FC<MainProps> = ({ words }) => {
    const {
        COLUMNS,
        ROWS,
        wordsArray,
        setWordsArray,
        currentRow,
        setCurrentRow,
        currentWord,
        setCurrentWord,
        playsCounter,
        setPlaysCounter,
        victories,
        setVitories,
        setStatisticsModalOpen,
        wordsDictionary,
        setWordsDictionary,
        wordsPlayerd,
        setWordsPlayerd,
        setIsGameOnHold,
        setTimer,
        setDisplayLastWord,
        setInPlaceKeys,
        inPlaceKeys,
        setWrongPlaceKeys,
        wrongPlaceKeys,
        setWrongKeys,
        wrongKeys,
        wordsArrayRefs
    } = useGlobalContext();

    const { countdown } = useCountdown({callback: () => {
        setStatisticsModalOpen(true)
        setPlaysCounter(playsCounter + 1);
        setIsGameOnHold(false);
        setCurrentRow(0);
        setWordsArray(Array(COLUMNS * ROWS).fill(''));
        setRandomWord();
        setDisplayLastWord(false);
        setInPlaceKeys([]);
        setWrongPlaceKeys([]);
        setWrongKeys([]);
    }});

    useEffect(() => {
        console.log(wordsArrayRefs)
    }, [wordsArrayRefs])

    useEffect(() => {
        console.log(currentWord)
    }, [currentWord])

    useEffect(() => {
        setTimer(countdown);
    }, [countdown])

    useEffect(() => {
        setWordsDictionary(words);
    }, [])

    useEffect(() => {
        setRandomWord();
    }, [wordsDictionary])

    useEffect(() => {
        if (rowIsCompleted()) {
            setCurrentRow(currentRow + 1);
        }
    }, [wordsArray])

    useEffect(() => {
        compareWords();
    }, [currentRow])

    useEffect(() => {
    }, [currentWord])

    useEffect(() => {
    }, [wordsPlayerd])

    const rowIsCompleted = () => {
        for (let i = 0; i < COLUMNS; i++) {
            if (wordsArray[currentRow * COLUMNS + i] === '') {
                return false;
            }
        }
        return true;
    }

    const setRandomWord = () => {
        const selectedWord = wordsDictionary[Math.floor(Math.random() * wordsDictionary.length)];
        if (!selectedWord) return;
        if(wordsPlayerd.length === wordsDictionary.length) {
            setStatisticsModalOpen(true);
            return;
        }
        if (!wordsPlayerd.includes(selectedWord)) {
            setWordsPlayerd([...wordsPlayerd, selectedWord.toUpperCase()]);
            setCurrentWord(selectedWord.toUpperCase());
            return;
        }
        setRandomWord();
    }

    const getCurrentWordRow = () => {
        const wordsArrayAux = [...wordsArray];
        let currentWordRow = '';
        for (let i = 0; i < COLUMNS; i++) {
            currentWordRow += wordsArrayAux[((currentRow - 1) * COLUMNS) + i];
        }
        return currentWordRow;
    }

    const playIsOver = () => {
        setStatisticsModalOpen(true);
        setPlaysCounter(playsCounter + 1);
        setIsGameOnHold(true);
    }

    const compareByChar = (currentWordRow: string) => {
        const inPlaceKeysAux = [...inPlaceKeys];
        const wrongPlaceKeysAux = [...wrongPlaceKeys];
        const wrongKeysAux = [...wrongKeys];

        for (let i = 0; i < COLUMNS; i++) {
            if (currentWord.charAt(i) === currentWordRow.charAt(i)) {
                inPlaceKeysAux.push(currentWordRow.charAt(i));
                wrongPlaceKeysAux.splice(wrongPlaceKeysAux.indexOf(currentWordRow.charAt(i)), 1);
            } else if (currentWord.includes(currentWordRow.charAt(i))) {
                wrongPlaceKeysAux.push(currentWordRow.charAt(i));
            } else {
                wrongKeysAux.push(currentWordRow.charAt(i));
            }
        }
        setInPlaceKeys(inPlaceKeysAux);
        setWrongPlaceKeys(wrongPlaceKeysAux);
        setWrongKeys(wrongKeysAux);
    }

    const compareWords = () => {
        if (!currentRow) return;
        const currentWordRow = getCurrentWordRow();
        compareByChar(currentWordRow);
        if (currentWordRow === currentWord) {
            setVitories(victories + 1);
            playIsOver();
        } else if (currentRow === ROWS) {
            setDisplayLastWord(true);
            playIsOver();
        }
    }

    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <Header />
            <Board />
            <Keyboard />
            <StatisticsModal />
            <InstructionsModal />
        </ThemeProvider>
    )
}

export default Main;