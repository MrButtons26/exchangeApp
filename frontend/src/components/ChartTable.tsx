import { useQuery } from "@tanstack/react-query";
import {marketData,tickers,kLines} from "../services/marketData.tsx";
import LineChart from "./LineChart.tsx";
import spinner from "../assets/spinner.svg";
import { commaAdder, percentage } from "../utils/pricePrettier.tsx";
import { scaleCalculator } from "../utils/pricePrettier.tsx";
import { useNavigate } from "react-router-dom";

export default function ChartTable() {
const navigate=useNavigate();
  const { isPending, data, } = useQuery({
    queryKey: ["marketData"],
    queryFn: marketData,
    staleTime: 10 * 1000,
  });
  const { data:tickerData} = useQuery({
    queryKey: ["tickerData"],
    queryFn: tickers,
    staleTime: 10 * 1000,
  });
  const { data:kLinesData} = useQuery({
    queryKey: ["kLinesData"],
    queryFn: kLines,
    staleTime: 10 * 1000,
  });
  return (
    <div className="flex w-[100%] justify-center">
    <div className=" layout-table flex self-center  text-white mt-20 flex-col  bg-[#131418]  rounded-lg items-start px-[30px] py-[20px] min-w-[1100px]">
      <button className="bg-[rgba(76,148,255,.16)] px-2 py-1 rounded-xl text-[rgba(76,148,255)] font-[600]  ">
        Spot
      </button>
      {isPending === true ? (
        <div className="self-center">
          <img src={spinner} alt="" />

        </div>
      ) : (
        <>
           <div className="flex text-gray-400 text-[14px] mt-4 pb-2 layout-items-header"><h1 className=" min-w-[300px] relative left-2">Name</h1>
           <h1 className=" min-w-[155px] relative">Price</h1>
           <h1 className=" min-w-[155px]">Market Cap</h1>
           <h1 className=" min-w-[155px]">24h Volume</h1>
           <h1 className=" min-w-[155px]">24h Change</h1>
           <h1 className="min-w-[155px]">Last 7 Days</h1></div>
          {data?.map((el,i:number) => (
           el.name!='USDC'&&<div key={i} className="cursor-pointer layout-items flex w-[100%] items-center justify-start px-[10px]  rounded-md " onClick={()=>navigate(`/trade/${el.symbol}`)}>
              <div className="flex gap-2 my-1 py-3 min-w-[300px]">
                <img
                  className="max-w-[50px] rounded-full"
                  src={el.image}
                  alt=""
                />
                <h1 className="font-semibold ">
                  {el.name} <br />
                  <span className="font-normal uppercase text-[12px] text-gray-400">
                    {el.symbol}
                  </span>
                </h1>
              </div>
              <h1 className="font-semibold min-w-[155px]">${commaAdder(el.current_price)}</h1>
              <h1 className="font-semibold min-w-[155px]">
                {scaleCalculator(el.market_cap)}
              </h1>
              <h1 className="font-semibold min-w-[155px]">
                {tickerData?.map((element)=>element.symbol===(el.symbol+'_usdc').toUpperCase()&&<h1>{scaleCalculator(element.quoteVolume,true)}</h1>)}
              </h1>
              <h1 className={`font-semibold min-w-[155px] ${String(el.currencies.usd.price_change_percentage_24hr)[0]==='-'?'text-red-400':'text-green-400'}`}>{percentage(el.currencies.usd.price_change_percentage_24hr)}%</h1>
              <LineChart symbolName={el.symbol} data={kLinesData}></LineChart>

            </div>
      
          ))}
        </>
      )}
    </div>
    </div>
  );
}
