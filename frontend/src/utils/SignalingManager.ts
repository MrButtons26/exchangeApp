import { callback } from "chart.js/helpers";



export default class SignalingManager{
  private static instance:SignalingManager;
  private ws :WebSocket;
  private bufferedMessages:object[]
  private id:number
  private initialized:boolean=false
  private callbacks:any={}
  private constructor(){
  this.ws=new WebSocket("wss://ws.backpack.exchange/")
  this.bufferedMessages=[];
  this.id=1;
  this.init();
}

  public static getInstance(){
    if(!SignalingManager.instance){
      SignalingManager.instance=new SignalingManager()
      return SignalingManager.instance;
    }
    return SignalingManager.instance;
  }
  init(){
  this.ws.onopen=()=>{
    this.initialized=true;
  }
  this.bufferedMessages.forEach((el)=>this.ws.send(JSON.stringify(el)))
  this.bufferedMessages=[];
  this.ws.onmessage=(event)=>{
    const message = JSON.parse(event.data);
    const type = message.data.e;
    if(type==='trade'){
      this.callbacks['trade'].forEach(({callback})=>{
        const newTrade:any = {
          "price": message.data.p,
          "quantity": message.data.q,
          "timestamp": message.data.t
      }
      callback(newTrade)
      })
    }
    else if(type==='depth'){
      this.callbacks['depth'].forEach(({callback})=>{
        const newTrade:any = {
        asks:[...message.data.a],bids:[...message.data.b]
      }
      callback(newTrade)
      })
    }
  }  
}
sendMessage(message:object){
const tempMessage={...message,id:this.id}
this.id+=1
if(!this.initialized){
 this.bufferedMessages.push(tempMessage)
return;
}
this.ws.send(JSON.stringify(tempMessage))
}
async registerCallback(type:string,callback:any,id:string){
this.callbacks[type]=this.callbacks[type]||[]
this.callbacks[type].push({callback,id})
}
async deRegisterCallback(type:string){
  this.callbacks[type]=[]
}
}
