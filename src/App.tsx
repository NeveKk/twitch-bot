/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import Modal from 'react-modal';
import AppBar from './assets/components/AppBar';

Modal.setAppElement('#root');

const App: React.FC = () => {
    return (
        <div className='flex flex-col h-screen select-none bg-gray-800'>
            <AppBar />
        </div>
    );
};

export default App;
