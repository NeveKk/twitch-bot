import React from 'react';
import PrimaryButton from '../templates/PrimaryButton';

const MainAppPage = () => {
    const handleDisconnectionClick = () => {
        window.Main.UserLogOut();
    };
    return (
        <div className='grid grid-cols-12 gap-5'>
            <PrimaryButton name='Disconnect' addedClasses='col-start-8 col-span-4' onClick={handleDisconnectionClick} />
        </div>
    );
};

export default MainAppPage;
