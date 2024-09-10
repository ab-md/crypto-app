import React, { useEffect, useState } from 'react';

import chartUp from "../assets/icon/chart-up.svg";
import chartDown from "../assets/icon/chart-down.svg";
import { GET_COIN, GET_COINS } from '../services/endpoints';
import Pagination from './Pagination';
import Search from './Search';
import Modal from './Modal';
import Loading from './Loading';

const CoinsList = () => {

    const [coins, setCoins] = useState([]);
    const [coin, setCoin] = useState({});
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("usd");
    const [errors, setErrors] = useState({});
    const [loadin, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getCoins = async () => {
            setLoading(true);
            setCoins([]);
            try {
                const res = await fetch(GET_COINS(currency, page));
                const data = await res.json();
                setCoins(data);
                setLoading(false);
            } catch (error) {
                if (error) {
                    setErrors(error);
                    setLoading(false);
                }
            }
        }
        getCoins();
    }, [page, currency])

    const showModal = async (coinId, data) => {
        try {
            const req = await fetch(GET_COIN(coinId, currency));
            const res = await req.json();
            setCoin({ ...res, coin: data });
            setModal(true);
        } catch (error) {
            setModal(false);
        }
    }

    return (
        <>
            <Search currency={currency} setCurrency={setCurrency} />
            <div className="my-container mt-8 min-h-96">
                {loadin && <Loading />}
                {errors && !coins.length && <p>{errors?.message}</p>}
                {!!coins.length && (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr className="table-grid">
                                <th>Coin</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>24h</th>
                                <th>Total Volume</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                coins.map(coin => (
                                    <TableRow coin={coin} key={coin.id} currency={currency} showModal={showModal} />
                                ))
                            }
                        </tbody>
                    </table>
                )
                }
            </div>
            {modal && <Modal modal={modal} setModal={setModal} coin={coin} currency={currency} />}
            <Pagination setPage={setPage} page={page} />
        </>
    );
};

export default CoinsList;

const TableRow = (props) => {

    const { coin, currency, showModal } = props;
    const { id, image, name, symbol, current_price, price_change_percentage_24h, total_volume } = coin;

    return (
        <tr className="border-b border-b-gray-800 table-grid font-medium">
            <td

                onClick={() => showModal(id, coin)}
                className="flex items-center cursor-pointer">
                <img src={image} alt={name} className="w-6 h-6 mr-2" />
                <p className="font-bold text-gray-300">{symbol.toUpperCase()}</p>
            </td>
            <td>{name}</td>
            <td>
                {
                    currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"
                }
                {current_price}
            </td>
            <td
                className={price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}
            >
                {price_change_percentage_24h.toFixed(2)}
            </td>
            <td>
                {
                    currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"
                }
                {total_volume}
            </td>
            <td>
                <img
                    src={price_change_percentage_24h > 0 ? chartUp : chartDown}
                    alt="chart"
                />
            </td>
        </tr>
    )
}