import StarRating from "../../Components/Form/StarRating";
import logo from "../../assets/logo.png";
import "./Home.css";



function Header(){
    return (
    <div className="card">
        <header>
            <img src={logo} alt=""  id="mgs"/>
        </header>
        <main>
            <h1>Loja Medeiros Galvão Soluções</h1>
            <span>O que você achou da sua experiência?


            </span>
       
         <div className="stars">

            .
         </div>
            <div className="raiting">

                <StarRating />
            </div>
        
        </main>
    </div>
    );
}

export default Header;