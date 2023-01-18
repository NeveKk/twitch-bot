import React from 'react';

const AppBar: React.FC = () => {
    return (
        <div className='flex justify-between draggable bg-zinc-900'>
            <div className='inline-flex ml-0.5 mr-1 my-0.5'>
                <img src='static://global-assets/images/icon-for-now.png' id='logo' width={30} alt='' />
                <p className='text-sm px-2 pt-1 md:ml-1 lg:ml-2'>Twitch bot</p>
            </div>
            <div className='inline-flex -mt-1'>
                <button
                    onClick={window.Login.Minimize}
                    className='undraggable px-4 pt-1 hover:bg-orange-500 hover:text-black'
                >
                    &#8211;
                </button>
                <button
                    onClick={window.Login.Close}
                    className='undraggable px-4 pt-1 hover:bg-red-500 hover:text-zinc-300'
                >
                    &#10005;
                </button>
            </div>
        </div>
    );
};

export default AppBar;
