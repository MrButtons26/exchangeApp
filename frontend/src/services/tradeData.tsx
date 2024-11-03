import axios from "axios";


export async function getDepthData(symbol:string) {
    try {
        const marketData = await axios.get(`http://localhost:8000/depth?symbol=${symbol}`)

        return marketData.data;
    }
    catch (e) {
        console.log(e)
    }
}

export async function getTradeData(symbol:string) {
    try {
        const tickerData = await axios.get(`http://localhost:8000/trades?symbol=${symbol}`);
          
        return tickerData.data;
    }
    catch (e) {
        console.log(e)
    }
}
export async function tradeTickers(symbol:string) {
    try {
        const tickerData = await axios.get('http://localhost:8000/tickers');
          
        return tickerData.data.filter((el)=>el.symbol===`${symbol}_USDC`);
    }
    catch (e) {
        console.log(e)
    }
}
