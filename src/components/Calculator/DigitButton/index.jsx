import React from 'react'
import { ACTIONS } from '..'

const DigitButton = ( { dispatch, digit }) => {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: { digit} })}>{ digit }</button>
  )
}

export default DigitButton