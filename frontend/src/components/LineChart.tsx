import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartValue } from "../utils/pricePrettier";
import { Chart as ChartJs,CategoryScale} from "chart.js";
type LineChartProps={
    symbolName:string
    data:{symbol:string}[]
}

export default function LineChart(chartData:LineChartProps){
   const [klines,setKLines]=useState<object[]>([]);
   useEffect(()=>{
    let symbolsName=chartData.symbolName
    if(chartData.symbolName.split('').findIndex((el)=>el=='$')!==-1){
    symbolsName=chartData.symbolName.slice(1)
    }
    setKLines([...chartData.data.filter(el=>el.symbol===(symbolsName.toUpperCase()+'_USDC'))])
   console.log(klines)
  },[])

   Chart.register(CategoryScale)
  
      const data={
       labels:Array.from({length:klines[0]?.data?.length}).fill(''),
       datasets:[{
           data:klines.length!==0&&klines[0]?.data?.map((el)=>parseInt(chartValue(el.close))),
           backgroundColor:'transparent',
           borderColor:klines[0]?.data[0]?.close>klines[0]?.data[klines[0]?.data?.length-1]?.close?'rgb(253 75 78)':'green',
           pointBorderColor:'transparent',
           fill:false,
           tension:.5,
           borderWidth:1.5
       }]
   }
  
   const options={scales: {
   y:{
     ticks:{
       display:false
     }
   }
   },
     plugins:{
       legend:{
           display:false,
          
       }
     }
   }
return<div className="w-[150px] relative top-[10px]">
{klines&&<Line data={data} options={options}></Line>}
</div>
  
}