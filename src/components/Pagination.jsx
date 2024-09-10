import React from 'react';

const Pagination = ({ page, setPage }) => {

    const nextPage = () => {
        if (page >= 10) return;
        setPage(page => page + 1)
    }
    const prevPage = () => {
        if (page <= 1) return;
        setPage(page => page - 1)
    }

    return (
        <div className="flex justify-center my-16">
            <button
                onClick={prevPage}
                className={`action-btn bg-blue-700 ${page <= 1 && "bg-blue-950 text-gray-400"}`}
            >
                previous
            </button>
            <p className={`my-btn ${page == 1 && "bg-blue-700"}`}>1</p>
            <p className={`my-btn ${page == 2 && "bg-blue-700"}`}>2</p>
            <p className="mx-2">...</p>
            {
                page > 2 && page < 9 && (
                    <>
                        <p className="my-btn bg-blue-700">{page}</p>
                        <p className="mx-2">...</p>
                    </>
                )
            }
            <p className={`my-btn ${page == 9 && "bg-blue-700"}`}>9</p>
            <p className={`my-btn ${page == 10 && "bg-blue-700"}`}>10</p>
            <button
                onClick={nextPage}
                className={`action-btn bg-blue-700 ${page >= 10 && "bg-blue-950 text-gray-400"}`}
            >
                next
            </button>
        </div>
    );
};

export default Pagination;