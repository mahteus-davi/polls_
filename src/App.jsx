import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RouterApp from './routes';

export default function App() {


  return (
    <div className="container">
      <ToastContainer />
      <RouterApp />
       
      </div>
  
  );
}

