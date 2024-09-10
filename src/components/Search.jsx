import { useEffect, useState } from 'react';

import { SEARCH_COINS } from '../services/endpoints';
import Loading from './Loading';
import "./search.css";

const Search = ({ currency, setCurrency }) => {

    const [coins, setCoins] = useState([]);
    const [query, setQuery] = useState("");

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const controller = new AbortController;
        setCoins([]);
        if (!query.length) return;
        const searchCoins = async () => {
            const req = await fetch(SEARCH_COINS(query), { signal: controller.signal });
            const data = await req.json();
            setCoins(data);
        }
        searchCoins();
        return () => controller.abort();
    }, [query])

    return (
        <div className="my-container mt-20 flex flex-col items-center sm:flex-row sm:justify-start">
            <div className="search w-full sm:w-fit">
                <input
                    onChange={changeHandler}
                    value={query}
                    type="search"
                    placeholder="Search"
                    className="py-2 px-3 rounded bg-gray-800 text-gray-400 sm:w-72 w-full"
                />
                <ul className={`flex flex-col ${query.length && "search-result"}`}>
                    {
                        coins?.coins?.length ?
                            (coins?.coins?.map(coin => (
                                <li className="flex py-2" key={coin.id}>
                                    <img src={coin.thumb} alt={coin.name} />
                                    <p className="ml-2">{coin?.name}</p>
                                </li>
                            )))
                            : !coins?.coins?.length && !!query.length &&
                            (<Loading />)
                    }
                </ul>
            </div>
            <select
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="sm:ml-6 sm:mt-0 mt-2 bg-gray-800 py-2 px-3 rounded w-full sm:w-fit"
            >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
        </div>
    );
};

export default Search;