import React, { useEffect, useState } from 'react';
import api from './axiosConfig';

const SolucaoList = () => {
    const [solucoes, setSolucoes] = useState([]);

    useEffect(() => {
        fetchSolucoes();
    }, []);

    const fetchSolucoes = async () => {
        try {
            const response = await api.get('/solucao/');
            setSolucoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar soluções:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Soluções</h2>
            <ul>
                {solucoes.map((solucao) => (
                    <li key={solucao.id}>
                        <strong>Estrategia</strong>{solucao.estrategia}<br />
                        <strong>Probabilidade Residual</strong>{solucao.probabilidade_residual}<br />
                        <strong>Impacto Residual</strong>{solucao.impacto_residual}<br />
                        <strong>Validacao Açao</strong>{solucao.validacao_acao}<br />
                        <strong>Data Alerta</strong>{solucao.data_alerta}<br />
                        <strong>Nome Piloto</strong>{solucao.nome_piloto}<br />
                        <strong>Piloto</strong>{solucao.id_piloto}<br />
                        <strong>Captalizaçao</strong>{solucao.captalizacao}<br />
                        <strong>Data Inicial</strong>{solucao.inicio_plano_acao}<br />
                        <strong>Açao</strong>{solucao.acao}<br />
                        <strong>Comentário</strong>{solucao.comentario}<br />
                        <strong>Resolucao</strong>{solucao.data_resolucao}<br />
                        <strong>Risco</strong>{solucao.id_risco}<br />
                    
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SolucaoList;
