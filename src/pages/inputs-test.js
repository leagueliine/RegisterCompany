import React from 'react'
import './input.css'

const InputsTeste = () => {

  return (

    <div className='container-inputs'>
      <form className='form-input'>
        <input className='input' type='text' placeholder='o que voce procura?' />
        <input className='input' type='text' placeholder='estado' />
        <input className='input' type='text' placeholder='cidade' />
        <button className='button'>Buscar</button>
      </form>
    </div>

  )
}

export { InputsTeste }