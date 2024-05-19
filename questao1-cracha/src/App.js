import React, { useState } from 'react';
import './App.css';

function App() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [resultado, setResultado] = useState('');

  function EnviaNome(event) {
    setNomeCompleto(event.target.value);
  }

  function handleForm(event) {
    event.preventDefault();
    if (nomeCompleto.trim() !== '') {
      formatarNome(nomeCompleto);
      setNomeCompleto('');
    } else {
      alert('Por favor, insira o nome do colaborador.');
    }
  }

  function formatarNome(nomeColaborador) {
    const nomes = nomeColaborador.split(' ');
    const ultimoNome = nomes[nomes.length - 1];
    let resultadoFormatado = ultimoNome.toUpperCase() + ',';

    const palavrasIgnoradas = ['de', 'da', 'das', 'do', 'dos', 'e'];

    nomes.slice(0, -1).forEach(nome => {
      if (!palavrasIgnoradas.includes(nome.toLowerCase())) {
        resultadoFormatado += ' ' + nome[0].toUpperCase() + '.';
      }
    });

    setResultado(resultadoFormatado);
  }

  return (
    <div className='main'>
      <header>
        <img className='logo' src='./assets/logo.jpg' alt='Logo'></img>
        <h1>Gerador de Crachás</h1>
      </header>
      <div className='formInput'>
        <form onSubmit={handleForm}>
          <h3>Entre com o nome do colaborador</h3>
          <input type='text' value={nomeCompleto} onChange={EnviaNome} />
          <button type='submit'>Formatar</button>
        </form>
      </div>
      <div></div>
      <div className='cracha'>
        <div className='suporte'></div>
        <img className='logoCracha' src='./assets/logo-azul-branco-modalgr.png' alt='Logo do Crachá'></img>
        {resultado && <p className='nomeColaborador'>{resultado}</p>}
        <div className='footer'></div>
      </div>
    </div>
  );
}

export default App;
