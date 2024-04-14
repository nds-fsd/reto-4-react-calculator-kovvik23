import React, { useEffect, useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
  ADD_NUMBER: 'add-number',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE: 'delete',
  EVALUATE: 'evaluate'
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_NUMBER:
      // Overwrite previous value checking overwrite flag
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      // Handle edge cases for 0s and periods
      if (payload.digit === '0' && state.currentOperand === '0') {return state}
      if (payload.digit === '.' && state.currentOperand.includes('.')) {return state}

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      };

      // Clicking new operation overwrites old operation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      // Move previous operand to current if there was no previous operand
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        }
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      // Default
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    case ACTIONS.EVALUATE:
      // If states are not correctly defined yet
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) { return state }

      return {
        ...state,
        overwrite: true, 
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '÷':
      computation = prev / current;
      break;
  }

  return computation.toString()
}

// Format numbers
const NUMBER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return NUMBER_FORMATTER.format(integer)
  return `${NUMBER_FORMATTER.format(integer)}.${decimal}`
};

const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // Keyboard functionality
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          dispatch({ type: ACTIONS.ADD_NUMBER, payload: { digit: key } });
          break;

        case '.':
          if (currentOperand && !currentOperand.includes('.')) {
            dispatch({ type: ACTIONS.ADD_NUMBER, payload: { digit: key } });
          }
          break;

        case 'Enter':
          dispatch({ type: ACTIONS.EVALUATE });
          break;

        case 'Backspace':
          dispatch({ type: ACTIONS.DELETE });
          break;

        case 'Escape':
          dispatch({ type: ACTIONS.CLEAR });
          break;

        case '+':
        case '-':
        case '*':
        case '/':
          let operation = (key === '/') ? '÷' : key;
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
          break;

        default:
          break;
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentOperand, dispatch]); 
  
  const formattedCurrentOperand = formatOperand(currentOperand);
  const formattedPreviousOperand = formatOperand(previousOperand);

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{formattedPreviousOperand} {operation}</div>
        <div className='current-operand'>{formattedCurrentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>      
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button className="span-two" onClick={ () => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>  
    )
}


export default Calculator;