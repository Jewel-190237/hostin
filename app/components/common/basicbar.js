import Image from 'next/image';
import React from 'react';

const Basicbar = () => {
    return (
            <div className=' w-full h-[192px] border relative '>
                <Image src={'/basicbar.jpeg'} alt='banner' fill className='object-fill' />
                <div className='relative flex items-center gap-2 top-[100px] left-10'>
                    <div className='w-[130px] h-[130px] bg-[#1D272F] border-white border-[5px] rounded-[40px] shadow-lg relative overflow-hidden'>
                        <Image src={'/basicbar.jpeg'} alt='banner' fill className=''/>
                    </div>
                    <h2 className='text-xl text-white font-semibold'>Admin Pannel</h2>
                </div>
            </div>
    );
};

export default Basicbar;