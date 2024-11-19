import { getTradeData,  } from "../services/tradeData"
import { useEffect,useState } from "react";
import { timeFormat } from "../utils/pricePrettier";
import spinner from "../assets/spinner.svg";
import SignalingManager from "../utils/SignalingManager";

type symbolData={
    id:string,
}
export default function TradeTable(symbolData:symbolData){
        const [trade, setTrades] = useState<object[]>([]);
        const [mount,setMount]=useState<boolean>(false);
        useEffect(() => {
            !mount&&SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`trade.${symbolData.id.toUpperCase()}_USDC`]});
            !mount&&SignalingManager.getInstance().registerCallback('trade',(data)=>{trade.unshift(data)},'1');
            setMount(true);
            (async function wrapper() {
              
                const tradeData = await getTradeData(symbolData.id?.toUpperCase() || '')
                setTrades([...tradeData])
                return()=>{SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`trade.${symbolData.id.toUpperCase()}_USDC`]}) ; SignalingManager.getInstance().deRegisterCallback('trade') };
            })()
        }, [trade])
return(trade.length!=0?<div className="flex flex-col gap-[2px] max-h-[500px] ">
<div className="grid-trade text-[13px] font-normal text-gray-400 pl-3 my-1"><h1>Price(USDC)</h1>
<h1>Qty({symbolData.id.toUpperCase()})</h1>
</div>
<div className="overflow-x-hidden scroll-bar">
{trade.map((el,i)=><div key={i} className="grid-trade text-[14px] font-normal hover:bg-[rgba(142,173,240,0.1)] pl-3 rounded-md cursor-pointer py-[1px]"><h1 className={`${el.isBuyerMaker===true?'text-red-500':'text-green-500'}`}>{el.price}</h1> <h1 className="text-[rgba(255,255,255,0.9)]">{el.quantity}</h1><h1 className="text-gray-400">{timeFormat(el.timestamp)}</h1></div>)}</div>
</div>:<div className="flex justify-center"><img src={spinner} className="h-[20px] w-[20px] relative left-[6px] top-[90px]" alt="" /></div>)
}