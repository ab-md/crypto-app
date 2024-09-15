import { useEffect, useState } from 'react';

import { GET_COIN, SEARCH_COINS } from '../services/endpoints';
import Loading from './Loading';
import "./search.css";
import Modal from './Modal';

const Search = ({ currency, setCurrency }) => {

    const [coins, setCoins] = useState([]);
    const [modalCoin, setModalCoin] = useState({});
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    const changeHandler = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const controller = new AbortController;
        setCoins([]);
        setLoading(true);
        if (!query.length) return;
        const searchCoins = async () => {
            const req = await fetch(SEARCH_COINS(query), { signal: controller.signal });
            const data = await req.json();
            setCoins(data);
            setLoading(false);
        }
        searchCoins();
        return () => controller.abort();
    }, [query])

    const showModal = async (coinId, data) => {
        try {
            const req = await fetch(GET_COIN(coinId, currency));
            const res = await req.json();
            setModalCoin({ ...res, coin: data });
            setModal(true);
        } catch (error) {
            setModal(false);
        }
    }

    return (
        <>
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
                                    <Searched key={coin.id} coin={coin} showModal={showModal} />
                                )))
                                : loading && !!query.length ? (<Loading />)
                                    : !loading && !!query.length && <p className="text-yellow-700">There aren't any coins with this id.</p>
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
            {modal && <Modal modal={modal} setModal={setModal} coin={modalCoin} currency={currency} />}
        </>
    );
};

export default Search;

const Searched = (props) => {
    const { coin, showModal } = props;
    const { thumb, name, id } = coin;
    return (
        <li className="flex py-2 cursor-pointer" onClick={() => showModal(id, coin)}>
            <img src={thumb} alt={name} />
            <p className="ml-2">{name}</p>
        </li>
    )
}