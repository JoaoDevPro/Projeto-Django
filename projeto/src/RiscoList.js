import React, { useEffect, useState } from 'react';
import api from './axiosConfig';
import RiscoForm from './RiscoForm';
import "./RiscoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


const RiscoList = () => {
    const [riscos, setRiscos] = useState([]);
    const [riscoAtual, setRiscoAtual] = useState(null);

    useEffect(() => {
        fetchRiscos();
    }, []);

    const fetchRiscos = async () => {
        try {
            const response = await api.get('/risco/');
            setRiscos(response.data);
        } catch (error) {
            console.error('Erro ao buscar riscos:', error);
        }
    };

    const handleSave = () => {
        fetchRiscos();
        setRiscoAtual(null);
    };

    const handleEdit = (risco) => {
        setRiscoAtual(risco);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/risco/${id}/`);
            fetchRiscos();
        } catch (error) {
            console.error('Erro ao deletar risco:', error);
        }
    };

    return (
        <div className='container1'>
            <div className='teste'>
            <div className='div-titulo'><h2 className='titulo'>Gestão de Riscos</h2></div>
            </div>
            <RiscoForm riscoAtual={riscoAtual} onSave={handleSave} />
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Risco</th>
                        <th>Probabilidade</th>
                        <th>Área</th>
                        <th>Classificação</th>
                        <th>Projeto</th>
                        <th>Entrada</th>
                        <th>Impacto</th>
                        <th>Consequência</th>
                        <th>Jalon</th>
                        <th>Metier</th>
                        <th>Status</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {riscos.map((risco) => (
                        <tr className='linha' key={risco.id}>
                            <td>{risco.descricao}</td>
                            <td>{risco.tipo}</td>
                            <td>{risco.probabilidade}</td>
                            <td>{risco.area}</td>
                            <td>{risco.classificacao}</td>
                            <td>{risco.projeto}</td>
                            <td>{risco.data_entrada}</td>
                            <td>{risco.impacto}</td>
                            <td>{risco.consequencia}</td>
                            <td>{risco.jalon_afetado}</td>
                            <td>{risco.metier}</td>
                            <td>{risco.status}</td>
                            <td>{risco.id_usuario}</td>
                            <td>
                                <button onClick={() => handleEdit(risco)}><FontAwesomeIcon icon={faPen} /></button>
                                <button onClick={() => handleDelete(risco.id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RiscoList;
