import { useState } from 'react'
import Ordem from './components/ordem'
import './App.css'

const ordensIniciais = [
  { id: crypto.randomUUID(), cliente: 'gustavo', servico: 'Troca de pastilhas de freio', valor: 85, concluida: false },
  { id: crypto.randomUUID(), cliente: 'luiz', servico: 'Regulagem de cambio', valor: 60, concluida: true },
  { id: crypto.randomUUID(), cliente: 'yasmin', servico: 'Troca de pneu', valor: 120, concluida: false },
]

function App() {
  const [ordens, setOrdens] = useState(ordensIniciais)
  const [nomeCliente, setNomeCliente] = useState('')
  const [nomeServico, setNomeServico] = useState('')
  const [preco, setPreco] = useState('')
  const [erro, setErro] = useState('')

  const abertas = ordens.filter((o) => o.concluida === false)
  const totalAberto = abertas.reduce((soma, o) => soma + o.valor, 0)

  function cadastrar(e) {
    e.preventDefault()

    if (nomeCliente.trim() === '' || nomeServico.trim() === '') {
      setErro('Preencha o cliente e o serviço.')
      return
    }

    const numero = Number(preco)
    if (preco.trim() === '' || isNaN(numero) || numero < 0) {
      setErro('Digite um valor válido (0 ou mais).')
      return
    }

    const nova = {
      id: crypto.randomUUID(),
      cliente: nomeCliente,
      servico: nomeServico,
      valor: numero,
      concluida: false,
    }

    setOrdens([...ordens, nova])
    setNomeCliente('')
    setNomeServico('')
    setPreco('')
    setErro('')
  }

  function concluir(id) {
    setOrdens(ordens.map((o) => (o.id === id ? { ...o, concluida: !o.concluida } : o)))
  }

  function remover(id) {
    setOrdens(ordens.filter((o) => o.id !== id))
  }

  return (
    <div className="pagina-principal">
      <h1>Oficina de Bicicletas</h1>

      <div className="caixa-resumo">
        <p>Total de ordens: {ordens.length}</p>
        <p>Ordens em aberto: {abertas.length}</p>
        <p>Valor em aberto: R$ {totalAberto}</p>
      </div>

      <form onSubmit={cadastrar} className="formulario-cadastro">
        <input placeholder="Cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
        <input placeholder="Serviço" value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} />
        <input placeholder="Valor" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <button type="submit">Cadastrar</button>
        {erro && <p className="mensagem-erro">{erro}</p>}
      </form>

      {ordens.length === 0 ? (
        <p>Não há ordens de serviço.</p>
      ) : (
        <ul className="lista-de-ordens">
          {ordens.map((ordem) => (
            <Ordem key={ordem.id} ordem={ordem} concluir={concluir} remover={remover} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App