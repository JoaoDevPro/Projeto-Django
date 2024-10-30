import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Limpar from "@material-ui/icons/Clear"; // Atualizado para Limpar
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import GetApp from "@material-ui/icons/GetApp"; // Novo ícone de download
import axios from "axios";
import Alert from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Limpar: forwardRef((props, ref) => <Limpar {...props} ref={ref} />), // Atualizado para Limpar
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <GetApp {...props} ref={ref} />), // Ícone de download
};

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/risco/`
});

function Risco() {
  const columns = [
    { title: "ID", field: "id", hidden: true },
    { title: "Descrição", field: "descricao" },
    { title: "Tipo", field: "tipo" },
    { title: "Probabilidade", field: "probabilidade" },
    { title: "Área", field: "area" },
    { title: "Classificação", field: "classificacao" },
    { title: "Projeto", field: "projeto" },
    { title: "Data de Entrada", field: "data_entrada", type: "date", editComponent: props => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Entrada"
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )},
    { title: "Impacto", field: "impacto" },
    { title: "Consequência", field: "consequencia" },
    { title: "Jalon Afetado", field: "jalon_afetado" },
    { title: "Metier", field: "metier" },
    { title: "Status", field: "status" },
    { title: "Usuário", field: "id_usuario" }
  ];
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log("Error");
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Converte para formato YYYY-MM-DD
  };

  const handleRowAdd = (newData, resolve) => {
    console.log("newData: ", newData);
  
    // Função para formatar a data no formato 'YYYY-MM-DD'
    const formatDateToYYYYMMDD = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    };
  
    if (!newData.data_entrada) {
      newData.data_entrada = formatDateToYYYYMMDD(new Date()); // Define a data atual no formato YYYY-MM-DD
    } else {
      // Se já existir uma data, formata-a corretamente
      newData.data_entrada = formatDateToYYYYMMDD(newData.data_entrada);
    }
  
    api
      .post("/", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(res.data);
        setData(dataToAdd);
        resolve();
        setErrorMessages([]);
        setIserror(false);
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    newData.data_entrada = formatDate(newData.data_entrada);

    api
      .patch("/" + newData.id + "/", newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
        setIserror(false);
        setErrorMessages([]);
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete("/" + oldData.id + "/")
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="App">
      <h1>Lista de Riscos</h1>
      {iserror && (
        <Alert severity="error">
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>;
          })}
        </Alert>
      )}
      <MaterialTable
        title="Gerenciamento de Riscos"
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={{
          toolbar: {
            searchPlaceholder: "Pesquisar",
          },
          header: {
            actions: "Ações"
          },
          body: {
            emptyDataSourceMessage: "Nenhum registro para exibir",
            filterRow: {
              filterTooltip: "Filtrar"
            }
          }
        }}
        components={{
          Toolbar: props => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <props.components.SearchField {...props.searchFieldProps} />
            </div>
          )
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              handleRowAdd(newData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
            })
        }}
        options={{
          exportButton: true,
          searchFieldStyle: { minWidth: 200 } // Diminui o campo de pesquisa
        }}
      />
    </div>
  );
}

export default Risco;
