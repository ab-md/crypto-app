import React, { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import "./modal.css";

import { convertData } from '../scripts/helpers';

const Modal = ({ setModal, coin, currency }) => {

    const types = [
        { id: 1, value: "prices", name: "Prices" },
        { id: 2, value: "market_caps", name: "Market Caps" },
        { id: 3, value: "total_volumes", name: "Total Volumes" },
    ]
    const [type, setType] = useState("prices");

    return (
        <div className="modal">
            <span
                onClick={() => setModal(null)}
                className="close"
            >
                X
            </span>
            <div className="chart">
                <div className="flex items-center mb-8">
                    <img
                        src={coin.coin.image}
                        alt={coin.coin.name}
                        className="w-10 h-10 mr-2"
                    />
                    <p style={{ lineHeight: "2rem" }}
                        className="font-semibold text-3xl">{coin.coin.name}</p>
                </div>
                <Graph coin={coin} type={type} />
                <div className="flex space-x-8">
                    {
                        types.map(item => (
                            <p
                                onClick={() => { setType(item.value) }}
                                key={item.id}
                                className={`${item.value === type ? "bg-blue-600 text-white" : "text-blue-600"} border-2 border-blue-600 px-4 py-1 rounded-md mt-10 cursor-pointer`}
                            >
                                {item.name}
                            </p>
                        ))
                    }
                </div>
                <div className="mt-10 mb-2 flex justify-between">
                    <div>
                        <span className="chart-info">Prices: </span>
                        <span>
                            {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}
                            {coin.coin.current_price}
                        </span>
                    </div>
                    <div>
                        <span className="chart-info">ATH: </span>
                        <span>
                            {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}
                            {coin.coin.ath}
                        </span>
                    </div>
                    <div>
                        <span className="chart-info">Market Cap: </span>
                        <span>
                            {coin.coin.market_cap}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

const Graph = ({ coin, type }) => {

    return (
        <div className="graph">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={400}
                    height={400}
                    data={convertData(coin, type)}
                >
                    <CartesianGrid stroke="#404042" />
                    <XAxis dataKey="date" hide />
                    <YAxis dataKey={type} domain={["auto", "auto"]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}