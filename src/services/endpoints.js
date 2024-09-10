const GET_COINS = (currency, page) => `${import.meta.env.VITE_BASE_URL}/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;
// const GET_COIN = (id, currency) => `${import.meta.env.VITE_BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=7&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;
const GET_COIN = (id, currency) => `${import.meta.env.VITE_BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=7`;
const SEARCH_COINS = query => `${import.meta.env.VITE_BASE_URL}/search?query=${query}&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

export {
    GET_COINS,
    GET_COIN,
    SEARCH_COINS,
}