import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2";
import { Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,title,Tooltip,Legend } from "chart.js";
type LineChartProps={
    symbolName:string
    data:{symbol:string}[]
}

export default function LineChart(chartData:LineChartProps){
//    const [klines,setKLines]=useState<object[]>([]);
//    useEffect(()=>{
//     setKLines([...chartData.data.filter(el=>el.symbol===(chartData.symbolName.toUpperCase()+'_USDC'))])
//    },[])
const data={
    labels:Array.from({length:7}).fill(' '),
    datasets:[{
        data:[1,2,3,4,5,6,7],
        backgroundColor:'transparent',
        borderColor:'red',
        pointBorderColor:'transparent',

    }]
}
return<div>
<Line data={data}></Line>
</div>
  
}