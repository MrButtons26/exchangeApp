import express from 'express'
import cors from 'cors'
import axios from 'axios';
const app=express();
app.use(cors())

app.get('/',async (req,res)=>{
    const tickerData=await axios.get('https://api.backpack.exchange/api/v1/tickers')
  res.status(200).json(tickerData.data)
})
app.get('/klines',async (req,res)=>{
  const startTime=Math.trunc((Date.now()-604800000)/1000);
  const endTime=Math.trunc((Date.now())/1000);
  const data=await axios.get(`https://api.backpack.exchange/wapi/v1/marketDataKlines?interval=6h&startTime=${startTime}&endTime=${endTime}`)
res.status(200).json(data.data)
})

app.listen(8000,()=>console.log('server listening at 8000'))
