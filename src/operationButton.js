import { Action } from "./App"

export default function OperationButton ({dispatch,operation}){
    return <button onClick={()=> dispatch({type: Action.choose_operation,payload: {operation}})}>{operation}</button>
}