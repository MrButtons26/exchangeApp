


class SignalingManager{
  private static instance:SignalingManager;
  private ws :WebSocket;
  private bufferedMessages:[]
  private id:number
  private constructor(){
   this.ws=new WebSocket("wss://ws.backpack.exchange/")
   this.bufferedMessages=[];
   this.id=1;
}
  public static getInstance(){
    if(!SignalingManager.instance){
      SignalingManager.instance=new SignalingManager()
      return SignalingManager.instance;
    }
    return SignalingManager.instance;
  }
}