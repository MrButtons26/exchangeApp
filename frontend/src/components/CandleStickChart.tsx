import { useEffect, useState,useRef } from "react"
import { candleStickData } from "../services/tradeData"
import { createChart,ColorType } from 'lightweight-charts';



type symbolData={
   id:string 
}
function getMilliSeconds(time:string){
const date=new Date(time).getTime();
return date;
}
export default function CandleStickChart(data:symbolData){
      const [candleData,setCandleData]=useState<object[]>([]);
      const chartContainerRef=useRef(null);
     useEffect(()=>{
       (async()=>{ 
        const candleDatas=await candleStickData(data.id.toUpperCase())
        const tempData=candleDatas.map((element:any)=>{return{low:parseFloat(element.low),high:parseFloat(element.high),'close':parseFloat(element.close),open:parseFloat(element.open),time:getMilliSeconds(element.end)}})
        console.log(tempData)
        setCandleData(()=>[...tempData])
       })();
    },[])
    useEffect(()=>{
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
            },
            width: 1200,
            height: 500, grid: {
                vertLines: {
                    visible: true,
                    color:'#9494941f',
                    lineWidth: 0.1,           
            
              
                },
                horzLines: {
                    visible: true,
                    color:'#9494941f',
                    lineWidth: 0.1,           

                }},    
        });
        chart.timeScale().fitContent();
        const newSeries = chart.addCandlestickSeries( {upColor: 'rgb(0 ,194, 120)', downColor: 'rgba(253, 75, 78, .9)', borderVisible: false,
            wickUpColor: 'rgb(0, 194 ,120)', wickDownColor: '#ef5350'});
             newSeries.setData(candleData);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
    },[candleData   ])
  return <div className="" ref={chartContainerRef}></div>
}