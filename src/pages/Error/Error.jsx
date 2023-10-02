import { Link } from 'react-router-dom';
import "./Error.css";


function Error(){

    return (
        <div className="error">
            
            <h1 className="erro">Error 404</h1>
            <h2>Pagina nao encontrada!</h2>
            <Link to="/">Veja todos os filmes.</Link>
        </div>
    );
}


export default Error;