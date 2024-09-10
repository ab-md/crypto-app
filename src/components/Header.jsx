import React from 'react';

const Header = () => {
    return (
        <header className="my-container bg-blue-600 sm:rounded-lg p-4 mt-3 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                Crypto App
            </h1>
            <div className="flex">
                <h2 className="text-black mr-1 font-semibold">Metacrypt</h2>
                <h3>| React.js project</h3>
            </div>
        </header>
    );
};

export default Header;