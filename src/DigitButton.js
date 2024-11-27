import { Action } from "./App"

export default function Digitbutton ({dispatch,digit}){
    return <button onClick={()=> dispatch({type: Action.add_digit,payload: {digit}})}>{digit}</button>
}