import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './Filmes.css';

function Filmes(){

    const [filme, setFilme] = useState({});
    const [timeload, setTimeload] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "sua key",
                        language: "pt-BR",
                      
                    }
                });
                setFilme(response.data);
                setTimeload(false);
            } catch {
                navigate("/", {replace:true});
                
                
                
            }
        }
        loadFilme();
    }, [navigate, id]);

    function saveFilme(){

        const minhaLista = localStorage.getItem("@filmes");

        const filmesSaves = JSON.parse(minhaLista) || [];
        const testFilme = filmesSaves.some((filmesSave) => filmesSave.id === filme.id ) 

        if(testFilme){
            toast.warn("Esse filmes já esta salvo em sua lista!");
            return;
            
        }

        filmesSaves.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSaves));
        toast.success("Filmes salvo com sucesso !");
    }

    if (timeload) {
        return(
            <div className="timeload">
                <h2>Carregando detalhes do filme...</h2>
            </div>
        )
    }
    return (


        <div className="container2">
            
           

                       
                            <h1>{filme.title}</h1>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <h3>Sinopse</h3>
                            <span>{filme.overview}</span>
                            <strong>Avaliação: {filme.vote_average} / 10 </strong>

                            <div className="button-ger">
                                <button onClick={saveFilme}>Salvar</button>
                                <button><a href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} target="blank" rel="external">Trailer</a></button>
                            </div>
                       
                    
            </div>
        
        
    );
}

export default Filmes;