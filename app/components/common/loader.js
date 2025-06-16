'use client'
import { InfinitySpin } from 'react-loader-spinner';

const MainLoader = () => {
    return (
        <div
            style={{ zIndex: 99999 }}
            className="fixed left-0 w-full top-0 h-screen flex justify-center items-center bg-gray-500 bg-opacity-25" id="main-loader">
            <Loader />
        </div>
    )
}

export const showLoader = () => document.getElementById("main-loader")?.classList?.remove('hidden')
export const hideLoader = () => document.getElementById('main-loader')?.classList?.add('hidden')

export default MainLoader

export const Loader = () => {
    return (
        <div className="inline-block">
            <InfinitySpin 
                width="200"
                color="#ea6b00" // Your garage orange color
            />
        </div>
    )
}

