import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Filme() {
  const { id } = useParams();
  const history = useHistory();

  const [ filme, setFilme ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get(`r-api/?api=filmes/${ id }`);
      // console.log(response.data);

      if (response.data.length === 0) {
        // Tentou acessar com id inexistente, navego usuário para home!
        history.replace('/');
        return;
      }

      setFilme(response.data);
      setLoading(false);
    }

    loadFilme();

    // Parar requisição ao desmontar componente do useEffect
    return () => {

    }

  }, [ id, history ]);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando seu filme...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{ filme.nome }</h1>
      <img src={ filme.foto } alt={ filme.nome } />

      <h3>Sinopse:</h3>
      { filme.sinopse }

      <div className='btns'>
        <button onClick={ () => { } }>Salvar</button>
        <button onClick={ () => { } }>
          <a target='_blank' rel="noopener noreferrer" href={ `https://www.youtube.com/results?search_query=${ filme.nome } trailer` }>Trailer</a>
        </button>
      </div>
    </div>
  )
}
