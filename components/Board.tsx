'use client'

import React from 'react';
import { useGlobalContext } from "@/context/store";
import WordSquare from "@/components/WordSquare";
import { WordSquareVariants } from "@/types/enums";

const Board: React.FC = () => {
  const {
    COLUMNS,
    wordsArray
  } = useGlobalContext();

  return (
    <div style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`}} className='grid gap-[11px] w-[420px] m-auto'>
      {wordsArray.map((word, index) => {
        return <WordSquare key={index} variant={WordSquareVariants.MainBoard} value={word} position={index} size={76} />
      })}
    </div>
  );
};

export default Board;