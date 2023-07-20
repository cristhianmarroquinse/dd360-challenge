import React from 'react';
import Image from 'next/image';
import { useGlobalContext } from '@/context/store';
import { Themes } from '@/types/enums';
import {useTheme} from "next-themes";


const Header: React.FC = () => {

    const {
        isInstructionsModalOpen,
        setIsInstructionsModalOpen,
        isStatisticsModalOpen,
        setStatisticsModalOpen,
    } = useGlobalContext();

    const {systemTheme , theme, setTheme} = useTheme();

    const changeTheme = () => {
        const currentTheme = theme === "system" ? systemTheme : theme ;

        if (currentTheme === Themes.Light) {
            setTheme(Themes.Dark);
        } else {
            setTheme(Themes.Light);
        }
    }
    
    return (
        <div className="dark:bg-dark-solid-bg bg-[#F3F3F3] flex flex-row justify-center text-center p-5 rounded-2xl w-[700px] m-auto mt-16 mb-14">
            <div className="basis-1/6 grid justify-center">
                <Image
                    priority
                    className='cursor-pointer'
                    src={`/images/bi_question-circle-fill${theme === Themes.Dark ? '-dark' : ''}.svg`}
                    height={27}
                    width={27}
                    alt="open instructions"
                    onClick={() => setIsInstructionsModalOpen(!isInstructionsModalOpen)}
                />
            </div>
            <div className="basis-4/6 dark:text-white text-gray-900 text-4xl text-center">WORDLE</div>
            <div className="basis-1/6 grid grid-flow-col gap-2 justify-center items-center">
                <Image
                    priority
                    className='cursor-pointer'
                    src={`/images/chart-duotone-line${theme === Themes.Dark ? '-dark' : ''}.svg`}
                    height={40}
                    width={40}
                    alt="open statistics"
                    onClick={() => setStatisticsModalOpen(!isStatisticsModalOpen)}
                />
                <Image
                    priority
                    className='cursor-pointer'
                    src={`/images/switch${theme === Themes.Dark ? '-dark' : ''}.svg`}
                    height={40}
                    width={40}
                    alt="change theme"
                    onClick={changeTheme}
                />
            </div>
        </div>
    )
}

export default Header;