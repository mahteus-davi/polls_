import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../../firebaseConfig'; // Importe sua configuração do Firestore
import "./Relatorio.css";

const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "bd"));
    const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        return {
            id: doc.id,
            atendimento: docData.atendimento,
            avaliacaoLocal: docData.avaliacaoLocal,
            tempoEspera: docData.tempoEspera,
            // Converta o timestamp para uma string legível
            timestamp: docData.timestamp ? new Date(docData.timestamp.seconds * 1000).toLocaleString() : 'Sem data'
        };
    });
    console.log(data);
    return data;
};



function Relatorio() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        fetchData().then(data => {
            setDados(data);
        });
    }, []);

    const downloadXLS = (data, filename) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

        // Buffer
        XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Binary string
        XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Criar um link de download
        XLSX.writeFile(workbook, filename);
    };

    return (
        <div>
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Atendimento</th>
                        <th>Avaliação Local</th>
                        <th>Tempo de Espera</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map(dado => (
                        <tr key={dado.id}>
                        <td>{dado.id}</td>
                        <td>{dado.atendimento}</td>
                        <td>{dado.avaliacaoLocal}</td>
                        <td>{dado.tempoEspera}</td>
                        <td>
                         {dado.timestamp}
                        </td>

                        </tr>
                    ))}
                </tbody>

            </table>
            
        </div>

        <button onClick={() => downloadXLS(dados, "dados.xlsx")}>Baixar Dados</button>
        </div>
    );
}

export default Relatorio;