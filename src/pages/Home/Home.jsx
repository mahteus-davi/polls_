import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "./Home.css";

function Home (){

    const [filmes, setFilmes] = useState([]);
    const [timeload, setTimeload] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get("/movie/now_playing", {
                    params: {
                        api_key: "sua key",
                        language: "pt-BR",
                        page: 1,
                    }
                });
                setFilmes(response.data.results.slice(0, 10));
                setTimeload(false);
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        }
        loadFilmes();
    }, []);

    if (timeload) {
        return(
            <div className="timeload">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
    return (
        <div className="container">
            <h1 className="top10">TOP 10 FILMES</h1>
            <div className="lista-filmes">

                {filmes.map((filme, index) => (
                        <article key={filme.id}>
                            <strong>{index + 1}. {filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filmes/${filme.id}`}>Sinopse</Link>
                        </article>
                    ))}
            </div>
        </div>
        
    );
}

export default Home;