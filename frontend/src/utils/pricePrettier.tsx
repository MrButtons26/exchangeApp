export function commaAdder(value: number) {
    const temp: string[] = String(value).split("");
    const decimalLocation: number = temp.findIndex((el) => el === ".");
    if (decimalLocation === 4) {
      temp.splice(1, 0, ",");
    }
    if (decimalLocation === -1) {
      temp.splice(2, 0, ",");
    }
    return temp.join("");
  }
  export function scaleCalculator(value: number,volume:boolean=false) {
    if(!volume){
    const length: number = String(value).length;
    if (length === 13) {
      return `$${String(value).slice(0, 3)}.${String(value)[3]}B`;
    }
    if (length === 12) {
        return `$${String(value).slice(0, 3)}.${String(value)[4]}B`;
      }
    if (length === 11) {
      return `$${String(value).slice(0, 2)}.${String(value)[2]}B`;
    }
    if (length === 10) {
      return `$${String(value)[0]}.${String(value)[1]}B`;
    }
    if (length === 9) {
      return `$${String(value).slice(0, 3)}.${String(value)[3]}M`;
    }
    if (length === 8) {
      return `$${String(value)[0]}.${String(value)[1]}M`;
    }
    if (length === 1) {
      return `-`;
    }
  }
  else{
    const temp: string[] = String(value).split("");
    const decimalLocation: number = temp.findIndex((el) => el === ".");
    if (decimalLocation === 4) {
      return `$${temp[0]}.${temp[1]}K`
    }
    if (decimalLocation === 6) {
      return  `$${temp.join('').slice(0,3)}.${temp[3]}K`
    }
    if (decimalLocation === 5) {
      return  `$${temp.join('').slice(0,2)}.${temp[2]}K`
    }
    if (decimalLocation === 2) {
      return  `$${temp.join('').slice(0,2)}.${temp[3]}`
    }
    if (decimalLocation === 7) {
      return  `$${temp.join('').slice(0,1)}.${temp[1]}M`
    }
     if (decimalLocation === 3) {
      return  `$${temp.join('').slice(0,3)}.${temp[4]}`
    }
  }
  }

  export function percentage(value:number){
    const temp: string[] = String(value);
   if(temp[0]==='-'){
  return `${temp.slice(0,5)}`
   }
  return`+${temp.slice(0,4)}`
  }
  

  export function chartValue(value:string){
    const decimalLocation=value.split('').findIndex((el) => el === ".");
    if(decimalLocation==1&&value[0]==='0'){
      const nonZeroIndex=value.split('').findIndex(el=>el!='0'&&el!='.')
      return value.slice(nonZeroIndex,nonZeroIndex+2);
    }
    else{
      return value;
    }
  }
  
  export function timeFormat(value:number){
    const time=new Date(value)
    return `${String(time.getHours()).padStart(2,0)}:${String(time.getMinutes()).padStart(2,0)}:${String(time.getSeconds()).padEnd(2,'0')}`

  }