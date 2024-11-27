import './App.css';
import './style.css';
import Digitbutton from './DigitButton';
import OperationButton from './operationButton';
import React, { useReducer } from 'react';

export const Action = {
  add_digit: 'add_digit',
  delete_digit: 'delete_digit',
  choose_operation: 'choose_operation',
  clear: 'clear',
  evaluate: 'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case Action.add_digit:
      if(state.overwrite){
        return{
          ...state,
          currOperand:payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit ==="0" && state.currOperand ==="0") {return state}
      if(payload.digit ==="." && state.currOperand.includes(".")) {return state}
      return{
        ...state,currOperand: `${state.currOperand || ""}${payload.digit}`
      }
      case Action.choose_operation:
        if(state.currOperand == null && state.prevOperand == null){return state}
        
        if(state.currOperand == null){
          return{
            ...state,
            operation: payload.operation,
          }
        }

        if(state.prevOperand == null){
          return{
            ...state,
            operation:payload.operation,
            prevOperand: state.currOperand,
            currOperand: null,
          }
        }
        return{
          ...state,
          prevOperand: evaluate(state),
          operation: payload.operation,
          currOperand: null
        }

      case Action.delete_digit:
        if(state.overwrite){
          return{
            ...state,
            overwrite: false,
            currOperand: null,
          }
        }
      
      if(state.currOperand == null) {return state}
      if(state.currOperand.length === 1){
        return{
          ...state,
          currOperand:null
        }
      }

      return{
        ...state,
        currOperand: state.currOperand.slice(0, -1)
      }

      case Action.clear: return{}

      case Action.evaluate:
      if(state.operation == null || state.currOperand == null || state.prevOperand == null){
        return state
      } 
      return{
        ...state,
        overwrite:true,
        prevOperand: null,
        operation: null,
        currOperand: evaluate(state),
      }
  }
}

function evaluate({currOperand,prevOperand,operation}){
  const prev = parseFloat(prevOperand)
  const curr = parseFloat(currOperand)
  
  if(isNaN(prev) || isNaN(curr)) {return ""}

  let computation =""

  switch(operation){
    case "+":
      computation = prev + curr
      break

    case "-":
      computation = prev - curr
      break
    
    case "*":
      computation = prev * curr
      break
    
    case "÷":
      computation = prev / curr
      break
  }
return computation.toString()

}

const Integer_formater = new Intl.NumberFormat("en-us", {maximumFractionDigits:0,})

function formaterOperand(operand){
  if (operand == null) return null;
  const [integer, decimal] = operand.split('.')
  if (decimal == null) {return Integer_formater.format(integer)}
  return `${Integer_formater.format(integer)}.${decimal}`
}

function App() {

  const [{currOperand,prevOperand,operation}, dispatch] = useReducer(reducer,{})

  //dispatch({type: Action.add_digit, payload: {digit: 1}})
  return (
    <div className = "calculator_grid">
      <div className = "output">
        <div className = "prev_operand">{formaterOperand(prevOperand)} {operation}</div>
        <div className = "curr_operand">{formaterOperand(currOperand)}</div>
      </div>
      <button className = "span-two" onClick={()=> dispatch({type: Action.clear})}>AC</button>
      <button onClick={()=> dispatch({type: Action.delete_digit})}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <Digitbutton digit="1" dispatch={dispatch}/>
      <Digitbutton digit="2" dispatch={dispatch}/>
      <Digitbutton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <Digitbutton digit="4" dispatch={dispatch}/>
      <Digitbutton digit="5" dispatch={dispatch}/>
      <Digitbutton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <Digitbutton digit="7" dispatch={dispatch}/>
      <Digitbutton digit="8" dispatch={dispatch}/>
      <Digitbutton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <Digitbutton digit="." dispatch={dispatch}/>
      <Digitbutton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type: Action.evaluate})}>=</button>
    </div>
  )
}

export default App;
