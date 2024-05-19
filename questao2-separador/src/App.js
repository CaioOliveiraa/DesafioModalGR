import React, { useState } from 'react';
import './App.css'

function SepararDados(dados) {

  const elementos = dados.split(',')

  const textos = []
  const numeros = []

  elementos.forEach(elemento => {
    elemento = elemento.trim()

    const numero = parseFloat(elemento)

    if (!isNaN(numero)) {
      numeros.push(elemento)
    } else if (elemento) {
      textos.push(elemento)
    }


  });

  return { textos, numeros }

}

function App() {

  const [dados, setDados] = useState('Ana, 89,78, Maria, 45.8, 27, 56, Paula Pereira, 978, A, VIVA, 35, 125, 8999,')
  const resultado = SepararDados(dados)

  return (
    <div className='main'>
      <header>
        <img src='./assets/logo.png'></img>
        <h1>Separação de Dados</h1>
        <p></p>
      </header>
      <div className='content'>
      <div className='string'>
        <h2>String</h2>
        <p>{dados}</p>
      </div>
        <div className='containerNomes'>
          <h2>Textos</h2>
          <p>{resultado.textos.join(', ')}</p>
        </div>
        <div className='containerNumeros'>
          <h2>Números</h2>
          <p>{resultado.numeros.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
