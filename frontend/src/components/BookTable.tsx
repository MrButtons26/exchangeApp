import { getDepthData } from "../services/tradeData"
import { useState,useEffect } from "react";
import SignalingManager from "../utils/SignalingManager";
import { sign } from "chart.js/helpers";
type symbolData={
    id:string,
    price:number
    flag:boolean
}
export default function BookTable(symbolData:symbolData){
    const [depth, setDepth] = useState<object>({});
    const [totalBid,setTotalBid]=useState<number>(0)
    const [totalAsk,setTotalAsk]=useState<number>(0)
    const [displayBtn,setDisplayBtn]=useState<number>(3)
    useEffect(() => {
        (async function wrapper() {
            SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`depth.200ms.${symbolData.id.toUpperCase()}_USDC`],"id":2})
            SignalingManager.getInstance().registerCallback('depth',(data)=>{},'1')
            const depthData = await getDepthData(symbolData.id?.toUpperCase() || '')
     
            depthData.bids=depthData.bids.reverse().slice(0,depthData.bids.length<14?depthData.bids.length-1:14

            );
            let bidSum:number=Number(depthData.bids[0][1])
            const totalBids:number=depthData.bids.reduce((acc:number,el:number[])=>acc+Number(el[1]),0)
            setTotalBid(totalBids)
            for(let i=0;i<depthData.bids.length;i++){
                depthData.bids[i].push(bidSum)
                bidSum+=Number(depthData.bids[i][1])
            }
            let askSum:number=Number(depthData.asks[0][1])
            for(let i=0;i<(depthData.asks.length<14?depthData.asks.length-1:14);i++){
                depthData.asks[i].push(askSum)
                askSum+=Number(depthData.asks[i][1])
            }
            depthData.asks=depthData.asks.slice(0,depthData.asks.length<14?depthData.asks.length-1:14).reverse();
            const totalAsks:number=depthData.asks.reduce((acc:number,el:number[])=>acc+Number(el[1]),0)
            setTotalAsk(totalAsks)
            setDepth({ ...depthData })
            return()=>{ SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`depth.200ms.${symbolData.id.toUpperCase()}_USDC`]}) ;SignalingManager.getInstance().deRegisterCallback('depth')
        }
        })()
    }, [depth] )
    // console.log(depth)
    // console.log(totalAsk,totalBid)

return(<div className="flex flex-col  mt-2 px-4"
> <div className="flex gap-2"><button onClick={()=>setDisplayBtn(1)} className="bg-[rgba(32,33,39,1)] px-1 py-1 rounded-lg hover:opacity-80"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="2" fill="#00c278"></rect><rect x="3" y="11" width="8" height="2" fill="#00c278"></rect><rect x="3" y="7" width="8" height="2" fill="#00c278"></rect><rect x="3" y="15" width="8" height="2" fill="#00c278"></rect><rect x="3" y="19" width="8" height="2" fill="#00c278"></rect><rect x="13" y="3" width="8" height="2" fill="#75798a"></rect><rect x="13" y="11" width="8" height="2" fill="#75798a"></rect><rect x="13" y="7" width="8" height="2" fill="#75798a"></rect><rect x="13" y="15" width="8" height="2" fill="#75798a"></rect><rect x="13" y="19" width="8" height="2" fill="#75798a"></rect></svg>
    </button> <button onClick={()=>setDisplayBtn(2)} className="bg-[rgba(32,33,39,1)] px-1 py-1 rounded-lg hover:opacity-80"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="2" fill="#75798a"></rect><rect x="3" y="11" width="8" height="2" fill="#75798a"></rect><rect x="3" y="7" width="8" height="2" fill="#75798a"></rect><rect x="3" y="15" width="8" height="2" fill="#75798a"></rect><rect x="3" y="19" width="8" height="2" fill="#75798a"></rect><rect x="13" y="3" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="11" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="7" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="15" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="19" width="8" height="2" fill="#fd4b4e"></rect></svg>
    </button><button onClick={()=>setDisplayBtn(3)}  className="bg-[rgba(32,33,39,1)] px-1 py-1 rounded-lg hover:opacity-80" ><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="2" fill="#00c278"></rect><rect x="3" y="11" width="8" height="2" fill="#00c278"></rect><rect x="3" y="7" width="8" height="2" fill="#00c278"></rect><rect x="3" y="15" width="8" height="2" fill="#00c278"></rect><rect x="3" y="19" width="8" height="2" fill="#00c278"></rect><rect x="13" y="3" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="11" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="7" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="15" width="8" height="2" fill="#fd4b4e"></rect><rect x="13" y="19" width="8" height="2" fill="#fd4b4e"></rect></svg></button></div>
    <div className="grid-trade text-[12px] font-normal text-gray-400 mt-1 mb-1" ><h1 className="text-white">Price (USDC)</h1>
<h1>Size ({symbolData.id.toUpperCase()})</h1>
<h1>Total ({symbolData.id.toUpperCase()})</h1></div>
<div className="scroll-bar overflow-x-hidden max-h-[390px]">
{displayBtn!=1&&depth?.asks?.map((el,i)=><div className="relative pl-1 my-1 grid-trade text-[14px] font-normal hover:bg-[rgba(142,173,240,0.1)] rounded-md cursor-pointer py-[1px] " key={i}><h1 className="text-red-500">{el[0]}</h1>
<h1>{el[1]}</h1>
<h1>{String(el[2]).slice(0,7)}</h1>
<div className={`absolute inset-y-0 inset-x-0 bg-red-400 opacity-30 rounded-md trns `} style={{width:`${Math.trunc(el[2]/totalAsk*100)}.2px`}}></div>
</div>)}
<h1 className={`${symbolData.flag===true?'text-red-500':'text-green-500'} my-1`}>{symbolData.price}</h1>
{displayBtn!=2&&depth?.bids?.map((el,i)=><div className="relative pl-1 my-1 grid-trade text-[14px] font-normal hover:bg-[rgba(142,173,240,0.1)] rounded-md cursor-pointer py-[1px] " key={i}><h1 className="text-green-500">{el[0]}</h1>
<h1>{el[1]}</h1>
<h1>{String(el[2]).slice(0,7)}</h1>
<div className={`absolute inset-y-0 inset-x-0 bg-green-500 opacity-30 rounded-md trns`} style={{width:`${Math.trunc(el[2]/totalBid*100)}.1px`}}></div></div>)}
</div>
<div className="flex w-[92%]  h-[25px] mb-2 text-[13px] font-normal  "><div className="relative  bg-green-900  text-green-500 flex items-center bar trns" style={{width:`${Math.trunc(totalBid/(totalAsk+totalBid)*100)}%`}} ><h1 className="pl-1">{Math.trunc(totalBid/(totalAsk+totalBid)*100)}%</h1></div>
<div className="flex items-center  bg-red-900 justify-end trns    text-red-500" style={{width:`${Math.trunc(totalAsk/(totalAsk+totalBid)*100)}%`}}><h1 className="pr-1">{Math.trunc(totalAsk/(totalAsk+totalBid)*100)}%</h1></div></div>
</div>
)
}
