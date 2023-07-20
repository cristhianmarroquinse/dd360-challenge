'use client'

import { useEffect } from "react";
import { useGlobalContext } from "@/context/store";
import Header from "@/components/Header";
import Board from "@/components/Board";
import StatisticsModal from "@/components/StatisticsModal";
import InstructionsModal from "@/components/InstructionsModal";
import { useCountdown } from '@/hooks/useCountdown';
import { ThemeProvider } from 'next-themes'

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
    } = useGlobalContext();

    const { countdown } = useCountdown({callback: () => {
        setStatisticsModalOpen(true)
        setPlaysCounter(playsCounter + 1);
        setIsGameOnHold(false);
        setCurrentRow(0);
        setWordsArray(Array(COLUMNS * ROWS).fill(''));
        setRandomWord();
        setDisplayLastWord(false);
    }});

    useEffect(() => {
        console.log('countdown', countdown)
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
        console.log('currentRow', currentRow)
    }, [currentRow])

    useEffect(() => {
        console.log('currentWord', currentWord);
    }, [currentWord])

    useEffect(() => {
        console.log('wordsPlayerd', wordsPlayerd);
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

    const compareWords = () => {
        if (!currentRow) return;
        const currentWordRow = getCurrentWordRow();
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
            <StatisticsModal />
            <InstructionsModal />
        </ThemeProvider>
    )
}

export default Main;