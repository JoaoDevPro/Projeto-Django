import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from './axiosConfig';
import "./RiscoList.css";
import CustomInput from './CustomInput';


const RiscoForm = ({ riscoAtual, onSave }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [risco, setRisco] = useState({
        descricao: '',
        tipo: '',
        probabilidade: '',
        area: '',
        classificacao: '',
        projeto: '',
        data_entrada: '',
        impacto: '',
        consequencia: '',
        jalon_afetado: '',
        metier: '',
        status: '',
        id_usuario: ''
    });

    useEffect(() => {
        if (riscoAtual) {
            setRisco(riscoAtual);
        }
    }, [riscoAtual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRisco({ ...risco, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (riscoAtual) {
            await api.put(`/risco/${riscoAtual.id}/`, risco);
        } else {
            await api.post('/risco/', risco);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className='form-input'>
                <input className='input-descricao' type="text" id='descricao' name="descricao" value={risco.descricao} onChange={handleChange} placeholder="Descrição" />
                <input className='input-tipo' type="text" id='tipo' name="tipo" value={risco.tipo} onChange={handleChange} placeholder="Tipo de Risco" />
                <input className='input-probabilidade' type="text" id='probabilidade' name="probabilidade" value={risco.probabilidade} onChange={handleChange} placeholder="Probabilidade" />
                <input className='input-area' type="text" id='area' name="area" value={risco.area} onChange={handleChange} placeholder="Área" />
                <input className='input-classificacao' type="text" id='classificacao' name="classificacao" value={risco.classificacao} onChange={handleChange} placeholder="Classificação" />
                <input className='input-projeto' type="text" id='projeto' name="projeto" value={risco.projeto} onChange={handleChange} placeholder="Projeto" />
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    customInput={<CustomInput placeholder="dia/mês/ano" />}
                    placeholderText="dia/mês/ano"
                />
                <input className='input-impacto' type="text" id='impacto' name="impacto" value={risco.impacto} onChange={handleChange} placeholder="Impacto" />
                <input className='input-consequencia' type="text" id='consequencia' name="consequencia" value={risco.consequencia} onChange={handleChange} placeholder="Consequência" />
                <input className='input-jalon' type="text" id='jalon_afetado' name="jalon_afetado" value={risco.jalon_afetado} onChange={handleChange} placeholder="Jalon Afetado" />
                <input className='input-metier' type="text" id='metier' name="metier" value={risco.metier} onChange={handleChange} placeholder="Metier" />
                <input className='input-status' type="text" id='status' name="status" value={risco.status} onChange={handleChange} placeholder="Status" />
                <input type="text" id='id_usuario' name="id_usuario" value={risco.id_usuario} onChange={handleChange} placeholder="Usuário" />
                <button type="submit" id='descricao' className='button-salvar'>Salvar</button>
            </div>
        </form>
    );
};

export default RiscoForm;
