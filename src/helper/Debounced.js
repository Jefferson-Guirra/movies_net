export default function Debounced (callback,dellay){
  let timer
  return function debounce(){
    if (timer){
      clearInterval(timer)
    }
    else{
      timer = setTimeout(()=>{
        callback()
        timer = null
      },dellay)
    }
  }
}