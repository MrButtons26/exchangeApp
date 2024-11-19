import axios from "axios";


export async function marketData() {
    try {
        const marketData = await axios.get('https://price-indexer.workers.madlads.com/?ids=solana,usd-coin,pyth-network,jito-governance-token,tether,bonk,helium,helium-mobile,bitcoin,ethereum,dogwifcoin,jupiter-exchange-solana,parcl,render-token,tensor,wormhole,wen-4,cat-in-a-dogs-world,book-of-meme,raydium,hivemapper,kamino,drift-protocol,nyan,jeo-boden,habibi-sol,io,zeta,mother-iggy,sanctum-2,moo-deng,debridge,shuffle-2,pepe,shiba-inu,chainlink,uniswap,ondo-finance,holograph,starknet,matic-network,mon-protocol,blur,worldcoin-wld,polyhedra-network,unagi-token,layerzero,aave,lido-dao,matr1x,polygon-ecosystem-token')

        return marketData.data;
    }
    catch (e) {
        console.log(e)
    }
}

export async function tickers() {
    try {
        const tickerData = await axios.get('http://localhost:8000/tickers');
          
        return tickerData.data;
    }
    catch (e) {
        console.log(e)
    }
}

export async function kLines() {
    try {
        const kLinesData = await axios.get('http://localhost:8000/klines');
          
        return kLinesData.data;
    }
    catch (e) {
        console.log(e)
    }
    
}
