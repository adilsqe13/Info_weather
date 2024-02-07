import React from 'react';
import spinner from './spinner.gif';
import blackSpinner from './blackSpinner.gif';

export function Spinner(props) {
  return (
      <div className='text-center'>
          <img height={props.height} width={props.width} src={spinner} alt="" />
      </div>
    
  )
}
export function BlackSpinner(props) {
  return (
      <div className='text-center'>
          <img height={props.height} width={props.width} src={blackSpinner} alt="" />
      </div>
    
  )
}
