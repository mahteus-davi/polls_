import { Link } from "react-router-dom";
import "./Header.css";

function Header(){

    return (

        <header>
            <Link className="logo" to="/">MMovie</Link>
            <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </header>
    );
}

export default Header;