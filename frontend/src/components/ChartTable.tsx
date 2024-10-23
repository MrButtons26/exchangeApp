import { useQuery } from "@tanstack/react-query";
import {marketData,tickers,kLines} from "../services/marketData.tsx";
import LineChart from "./LineChart.tsx";
import spinner from "../assets/spinner.svg";
import { commaAdder, percentage } from "../utils/pricePrettier.tsx";
import { scaleCalculator } from "../utils/pricePrettier.tsx";

export default function ChartTable() {

  const { isPending, data, } = useQuery({
    queryKey: ["marketData"],
    queryFn: marketData,
    staleTime: 15 * 1000,
  });
  const { data:tickerData} = useQuery({
    queryKey: ["tickerData"],
    queryFn: tickers,
    staleTime: 15 * 1000,
  });
  const { data:kLinesData} = useQuery({
    queryKey: ["kLinesData"],
    queryFn: kLines,
    staleTime: 15 * 1000,
  });
  return (
    <div className="flex w-[100%]  text-white mt-20 flex-col ">
      <LineChart symbolName={'aave'} data={kLinesData}></LineChart>
      <button className="bg-[rgba(76,148,255,.16)] px-2 py-1 rounded-xl text-[rgba(76,148,255)] font-[600]  ">
        Spot
      </button>
      {isPending === true ? (
        <div className="self-center">
          <img src={spinner} alt="" />

        </div>
      ) : (
        <>
          {data?.map((el,i:number) => (
            <div key={i} className="flex w-[100%] items-center  justify-evenly">
              <div className="flex gap-2 my-1 py-3">
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
              <h1 className="font-semibold">${commaAdder(el.current_price)}</h1>
              <h1 className="font-semibold">
                {scaleCalculator(el.market_cap)}
              </h1>
              <h1 className="font-semibold">
                {tickerData?.map((element)=>element.symbol===(el.symbol+'_usdc').toUpperCase()&&<h1>{scaleCalculator(element.quoteVolume,true)}</h1>)}
              </h1>
              <h1 className={`font-semibold ${String(el.currencies.usd.price_change_percentage_24hr)[0]==='-'?'text-red-400':'text-green-400'}`}>{percentage(el.currencies.usd.price_change_percentage_24hr)}%</h1>
            </div>
      
          ))}
        </>
      )}
    </div>
  );
}
