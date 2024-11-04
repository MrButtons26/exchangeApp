import { useParams } from "react-router-dom"
import {  tradeTickers } from "../services/tradeData"
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { commaAdder } from "../utils/pricePrettier";
import usdc from "../assets/usdc.webp"
import BookTable from "../components/BookTable";
import TradeTable from "../components/TradeTable";
export default function MarketPage() {

    const [activebtn, setActiveBtn] = useState<number>(1);
    const [activeLimit, setActiveLimit] = useState<number>(1);
   const [activeBook,setActiveBook]=useState<number>(1);

    const { id } = useParams()
    const { data: tickerData } = useQuery({
        queryKey: ["tradeTickersdata"],
        queryFn: () => tradeTickers(id.toUpperCase() || ''),
        staleTime: 20 * 1000,
    });

    return <>
        <Navbar></Navbar>
        <div className="flex w-full text-white mt-3  layout-market-table">
            {tickerData && <div className="flex font-semibold justify-between w-full">
                <div className="flex flex-col">
                <div className="flex gap-12 items-center ml-3 self-start" >
                <h1 className="bg-gray-900 px-3  py-2 rounded-full">{id?.toUpperCase()} <ion-icon name="chevron-down-outline"></ion-icon></h1>
                <h1><span className={`${tickerData[0]?.lastPrice < tickerData[0].firstPrice ? 'text-red-500' : 'text-green-500'} text-[20px]`}>{commaAdder(tickerData[0]?.lastPrice)}</span><br /><span className="text-[15px]">${tickerData[0]?.lastPrice}</span></h1>
                <h1><span className="text-[13px] font-bold text-gray-400">24H change</span> <br />   <span className={`${tickerData[0]?.priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>{tickerData[0]?.priceChange}</span> <span className={`${tickerData[0]?.priceChange < 0 ? 'text-red-500' : 'text-green-500'}`}>{String(tickerData[0]?.priceChangePercent * 100).slice(0, 5)}%</span></h1>
                <h1><span className="text-[13px] font-bold text-gray-400">24H high</span><br /><span>${tickerData[0]?.high}</span></h1>
                <h1><span className="text-[13px] font-bold text-gray-400">24H low</span><br /><span>${tickerData[0]?.low}</span></h1>
                <h1><span className="text-[13px] font-bold text-gray-400">24H Volume (USDC)</span><br /><span>${String(tickerData[0]?.quoteVolume)}</span></h1>
                </div>
                <div className="flex">
                    <div></div>
                    <div className="flex flex-col">
                     <div className="flex ">   
                     <button  onClick={() => setActiveBook(1)} className={`mx-2 text-[14px] py-1 my-1 ml-5 ${activeBook===1&&'border-b-[1px] border-sky-400'}`}>Book</button>
                     <button  onClick={() => setActiveBook(2)} className={`mx-2 text-[14px] py-1 my-1 ${activeBook===2&&'border-b-[1px] border-sky-400'}`}>Trades</button>                    </div>
                    <>{activeBook===1?<BookTable id={id||''} price={tickerData[0]?.lastPrice} flag={tickerData[0]?.lastPrice < tickerData[0].firstPrice} ></BookTable>:
                    <TradeTable id={id||''}></TradeTable>}
                    </>
                    </div>
                </div>
            </div>
                <div className="flex flex-col" style={{ boxShadow: "0px 0px 1px  rgba(110, 110, 110, 0.473)" }} >
                    <div className="flex  grow-1" >
                    <button onClick={() => setActiveBtn(1)} className={`px-20 py-4 text-[15px] text-green-400 ${activebtn === 1 && 'bg-[rgba(0,194,120,.08)] border-b-[1px] border-green-400'}`}>Buy</button><button onClick={() => setActiveBtn(2)} className={`px-20 py-4 text-[15px] text-red-400 ${activebtn === 2 && 'bg-[rgba(194,0,0,0.14)] border-b-[1px] border-red-400'}`}>Sell</button></div>
                    <div>
                        <button  onClick={() => setActiveLimit(1)} className={`mx-2 text-[14px] py-1 my-1 ml-5 ${activeLimit===1&&'border-b-[1px] border-sky-400'}`}>Limit</button>
                        <button  onClick={() => setActiveLimit(2)} className={`mx-2 text-[14px] py-1 my-1 ${activeLimit===2&&'border-b-[1px] border-sky-400'}`}>Market</button>
                        <h1 className="text-[12px] text-gray-500 my-2 w-full pl-5">Available Balance</h1>
                     <form action="" className="flex flex-col items-center ">
                     <h1 className="text-[12px] text-gray-500 my-2 w-full pl-6">Price</h1>
                     <div className=" bg-transparent w-[90%] rounded-md flex justify-start items-center gap-3 input-active " style={{border:"2px solid rgb(32, 33 ,39)"}}> <img className="w-[25px] h-[25px] relative left-2"  src={usdc} alt="" /><input defaultValue={tickerData[0].lastPrice} className=" bg-transparent py-[2px] text-[24px] font-medium  w-[80%] outline-none" type="text"/></div>
                     <h1 className="text-[12px] text-gray-500 my-2 w-full pl-6">Quantity</h1>
                        <div className=" bg-transparent w-[90%] rounded-md flex justify-start items-center gap-3 input-active " style={{border:"2px solid rgb(32, 33 ,39)"}}> <img className="w-[25px] h-[25px] relative left-2"  src={usdc} alt="" /><input placeholder="0"  className=" bg-transparent py-[2px] text-[24px] font-medium  w-[80%] outline-none" type="text"/></div>
                        <input type="range" className=" w-[90%] mt-4" step={25} defaultValue={0}/>
                        <div className="w-[90%] relative flex justify-between bottom-[6px]">
                        <div className="dots "></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        </div>
                        <h1 className="flex justify-between w-[86%] text-[12px] font-medium text-gray-400 mt-[1px]"><span>0</span><span>100%</span></h1>
                        <h1 className="text-[12px] text-gray-500 my-2 w-full pl-6">Order Value</h1>
                        <div className=" bg-transparent w-[90%] rounded-md flex justify-start items-center gap-3 input-active " style={{border:"2px solid rgb(32, 33 ,39)"}}> <img className="w-[25px] h-[25px] relative left-2"  src={usdc} alt="" /><input placeholder="0"  className=" bg-transparent py-[2px] text-[24px] font-medium  w-[80%] outline-none" type="text"/></div>

                        <button className="px-2 py-2 my-2 bg-white text-black rounded-2xl w-[90%] text-[20px] font-medium "><span className="font-semibold">Sign Up</span> to trade</button>
                        <button  className="px-2 py-2 my-2  text-black rounded-2xl md w-[90%] text-[20px] font-thin" style={{backgroundColor:" rgb(56 58 69)"}}><span className="font-semibold">Sign In</span> to trade</button>
                     </form>

                    </div>
                    </div>
            </div>}
            <div className="flex-col">

                <div></div>
            </div>
            <div>
            </div>
        </div>
    </>
}