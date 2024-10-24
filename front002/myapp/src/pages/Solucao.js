import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `http://127.0.0.1:8000/solucao/`
});

function Solucao() {
  const columns = [
    { title: "ID", field: "id", hidden: true },
    { title: "Estrategia", field: "estrategia" },
    { title: "Probabilidade Residual", field: "probabilidade_residual" },
    { title: "Impacto Residual", field: "impacto_residual" },
    { title: "Validacao Acao", field: "validacao_acao" },
    { title: "Data Alerta", field: "data_alerta", type: "date", editComponent: props => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Entrada"
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )},
    { title: "Nome Piloto", field: "nome_piloto" },
    { title: "ID_piloto", field: "id_piloto" },
    { title: "Capacitação", field: "captalizacao" },
    { title: "D.Inicial", field: "inicio_plano_acao", type: "date", editComponent: props => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Entrada"
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )},
    { title: "Ação", field: "acao" },
    { title: "Comentário", field: "comentario" },
    { title: "D.resolução", field: "data_resolucao", type: "date", editComponent: props => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data de Entrada"
          value={props.value}
          onChange={props.onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )},
    { title: "Risco", field: "id_risco" },

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

  const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

// Função para formatar todas as datas no formato YYYY-MM-DD no objeto
const formatAllDates = (data) => {
  const dateFields = ['data_alerta', 'inicio_plano_acao', 'data_resolucao']; // Lista de todos os campos que são datas
  dateFields.forEach(field => {
    if (data[field]) {
      data[field] = formatDateToYYYYMMDD(data[field]);
    }
  });
  return data;
};

const handleRowAdd = (newData, resolve) => {
  console.log("newData: ", newData);

  // Formata todas as datas
  newData = formatAllDates(newData);

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
  // Formata todas as datas
  newData = formatAllDates(newData);

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
      <h1>Lista de Soluçao</h1>
      {iserror && (
        <Alert severity="error">
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>;
          })}
        </Alert>
      )}
      <MaterialTable
        title="Gerenciamento de Solução"
        columns={columns}
        data={data}
        icons={tableIcons}
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
          exportButton: true
        }}
      />
    </div>
  );
}

export default Solucao;
