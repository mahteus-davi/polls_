import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Favoritos.css";


function Favoritos (){
const [filmes, setFilmes] = useState([]);


useEffect (() => {

    const minhaLista = localStorage.getItem("@filmes");
    setFilmes(JSON.parse(minhaLista) || []);
},[])
 
function handleDelete(id){
     
        const filtroFilmes = filmes.filter((filme) => (filme.id !== id));
        setFilmes(filtroFilmes);
        localStorage.setItem("@filmes", JSON.stringify(filtroFilmes));
        toast.success("Filme excluido com sucesso !");
}
 return(

    <div className="my-filmes">
        <h1>Meus filmes salvos</h1>
        {filmes.length === 0 && <span>Você não possui filmes salvos !</span>}
        <ul>
           {filmes.map((filme)=> (
                <li key={filme.id}>
                <span>{filme.title}</span>

                
                <div>
                    <Link to={`/filmes/${filme.id}`}>Ver detalhes</Link>
                    <button onClick={() => handleDelete(filme.id)}>Excluir</button>
                </div>
            </li>

            ))}
        </ul>
    </div>
 );
 }

export default Favoritos;