import React from 'react';
import { useGlobalContext } from "@/context/store";
import WordSquareMainBoard from './WordSquare/WordSquareMainBoard';

const Board: React.FC = () => {
  const {
    COLUMNS,
    wordsArray
  } = useGlobalContext();

  return (
    <div style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`}} className='grid gap-[11px] w-[350px] m-auto'>
      {wordsArray.map((word, index) => 
        <WordSquareMainBoard key={index} value={word} position={index} size={60} />
      )}
    </div>
  );
};

export default Board;
