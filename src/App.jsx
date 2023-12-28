import './App.css';
import Rodape from './Components/rodape/Rodape';
import RouterApp from './routes'; // Importe o RouterApp

export default function App() {
  return (
    <div>
      <RouterApp />
      <Rodape />
    </div>
  );
}
