import './Ordem.css'

function Ordem({ ordem, concluir, remover }) {
  return (
    <li className={ordem.concluida ? 'ordem concluida' : 'ordem'}>
      <h3>{ordem.cliente}</h3>
      {ordem.concluida && <span className="selo">Concluída</span>}
      <p>{ordem.servico}</p>
      <p>R$ {ordem.valor}</p>
      <button onClick={() => concluir(ordem.id)}>
        {ordem.concluida ? 'Reabrir' : 'Concluir'}
      </button>
      <button onClick={() => remover(ordem.id)}>Remover</button>
    </li>
  )
}

export default Ordem