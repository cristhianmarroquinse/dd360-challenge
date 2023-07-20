'use client'

import React from 'react';
import { useGlobalContext } from "@/context/store";
import Modal from '@/components/Modal';

const StatisticsModal: React.FC = () => {
    const {
        isStatisticsModalOpen,
        setStatisticsModalOpen,
        playsCounter,
        victories,
        currentWord,
        timer,
        displayLastWord,
    } = useGlobalContext();

    const [minutes, seconds] = timer;

    return (
        <Modal 
            show={isStatisticsModalOpen}
            modalTitle='Estadísticas'
            buttonActionText='Aceptar'
            buttonAction={() => setStatisticsModalOpen(false)}
        >
            <div className='grid grid-flow-col py-8 dark:text-white text-black text-center '>
                <div>
                    <p className='text-4xl font-extrabold'>{playsCounter}</p>
                    <p className='text-xl font-normal py-4'>Jugadas</p>
                </div>
                <div>
                    <p className='text-4xl font-extrabold'>{victories}</p>
                    <p className='text-xl font-normal py-4'>Victorias</p>
                </div>
            </div>

            {
                displayLastWord && (<div className='flex justify-center text-black dark:text-white text-lg'>
                    <span className='pr-2'>La palabra era:</span>
                    <span className='font-bold'>{currentWord}</span>
                </div>)
            }
            

            <div className='flex justify-center mt-8'>SIGUIENTE PALABRA</div>

            <div className='flex justify-center mt-2 text-black dark:text-white text-2xl font-bold '>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
        </Modal>
    )
}

export default StatisticsModal;