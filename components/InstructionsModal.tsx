import React from 'react';
import { useGlobalContext } from "@/context/store";
import Modal from '@/components/Modal';
import WordSquareStatic from './WordSquare/WordSquareStatic';

interface WordExample {
    char: string;
    bgColor: string;
    bordered: boolean;
}

const InstructionsModal: React.FC = () => {
    const {
        isInstructionsModalOpen,
        setIsInstructionsModalOpen
    } = useGlobalContext();

    const exampleOne: WordExample[] = [{
            char: 'G',
            bgColor: '#66A060',
            bordered: false,
        }, {
            char: 'A',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'T',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'O',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'S',
            bgColor: '#FFF',
            bordered: true,
        }
    ];

    const exampleTwo: WordExample[] = [{
            char: 'V',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'O',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'C',
            bgColor: '#CEB02C',
            bordered: false,
        }, {
            char: 'A',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'L',
            bgColor: '#FFF',
            bordered: true,
        }
    ];

    const exampleThree: WordExample[] = [{
            char: 'C',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'A',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'N',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'T',
            bgColor: '#FFF',
            bordered: true,
        }, {
            char: 'O',
            bgColor: '#939B9F',
            bordered: false,
        }
    ];

    const renderExample = (example: WordExample[]) => {
        return example.map((word, index) => {
            return (
                <WordSquareStatic
                    key={index}
                    value={word.char}
                    color={word.bgColor}
                    bordered={word.bordered}
                    size={50}
                />
            )
        })
    }

    return (
        <Modal 
            show={isInstructionsModalOpen}
            modalTitle='Cómo jugar'
            buttonActionText='!JUGAR¡'
            buttonAction={() => setIsInstructionsModalOpen(false)}
        >
            <div className='m-10 mb-5'>
                <p>
                    Adivina la palabra oculta en cinco intentos.
                    <br></br>
                    <br></br>
                    Cada intento debe ser una palabra válida de 5 letras.
                    <br></br>
                    <br></br>
                    Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
                </p>
            </div>

            <div className='mx-10 mb-5'>
                <span className='font-bold'>Ejemplos</span>
            </div>

            <div className='grid grid-cols-5 w-[400px] m-auto'>
                { renderExample(exampleOne) }
            </div>

            <div className='mx-10'>
                <span>La letra <strong>G</strong> está en la palabra y en la posición correcta.</span>
            </div>

            <div className='grid grid-cols-5 w-[400px] m-auto'>
                { renderExample(exampleTwo) }
            </div>

            <div className='mx-10'>
                <span>La letra <strong>C</strong> está en la palabra pero en la posición incorrecta.</span>
            </div>

            <div className='grid grid-cols-5 w-[400px] m-auto'>
                { renderExample(exampleThree) }
            </div>

            <div className='mx-10'>
                <span>La letra <strong>O</strong> no está en la palabra.</span>
            </div>

            <div className='flex justify-center mt-10'>
                <span className='dark:text-white text-black text-lg'>¡Una palabra nueva cada 5 minutos!</span>
            </div>
        </Modal>
    )
}

export default InstructionsModal;