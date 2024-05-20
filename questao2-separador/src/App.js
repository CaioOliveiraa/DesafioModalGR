import React, { useState } from 'react';
import './App.css'

// Exemplo: Ana, 89,78, Maria, 45.8, 27, 56, Paula Pereira, 978, A, VIVA, 35, 125, 8999,

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
  const [dados, setDados] = useState('')
  const [resultado, setResultado] = useState({ textos: [], numeros: [] })

  const mudarDados = (event) => {
    setDados(event.target.value)
  }

  const enviarDados = (event) => {
    event.preventDefault();
    const resultadoSeparado = SepararDados(dados)
    setResultado(resultadoSeparado)
  }

  return (
    <div className='main'>
      <div>
        <img src='./assets/logo.png' alt="Logo"></img>
      </div>
      <div className='content'>
        <form onSubmit={enviarDados}>
          <div>
            <h2>STRING</h2>
            <input
              type="text"
              placeholder='Insira os dados aqui, separados por vírgula'
              value={dados}
              onChange={mudarDados}
            />
            <button type="submit">Separar</button>
          </div>
        </form>
        <div>
          <h2>TEXTOS</h2>
          <p>{resultado.textos.join(', ')}</p>
        </div>
        <div>
          <h2>NÚMEROS</h2>
          <p>{resultado.numeros.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
