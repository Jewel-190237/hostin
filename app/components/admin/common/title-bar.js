'use client';
import { useI18n } from '@/app/context/i18n';
import React from 'react';

const TitleBar = ({ title, content }) => {
    const i18n = useI18n();
    return (
        <div className='flex sm:flex-row flex-col md:items-center justify-between py-6 px-4 shadow bg-white rounded-md mb-4'>
            <h2 className='sm:text-xl text-lg font-medium text-[#3d3a4e]'>{i18n?.t(title)}</h2>
            {
                content && (
                    <div>
                        {content}
                    </div>
                )
            }

        </div>
    );
};

export default TitleBar;