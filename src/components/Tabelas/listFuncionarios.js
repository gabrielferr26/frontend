import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";

import Swal from 'sweetalert2';

//Importação de Componentes
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

//Table de Funcionarios
export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaFuncionarios: []
        }
    }

    componentDidMount() {
        const url = "http://localhost:3000/lista/funcionarios";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaFuncionarios: data });
                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + url);
            });
    }

    /*loadEmployee() {
        const url1 = "http://localhost:8000/lista/funcionarios";
        axios.get(url1, { headers: authHeader() })
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaFuncionarios: data });
                } else { alert("Error Web Service!"); }
            })
            .catch(error => {
                alert(error);
            });
    }*/


    render() {
        return (
            <table className="table table-light table-borderless table-hover">
                <thead>
                    <tr className="heigher " style={{ color: blue['600'] }}>
                        <th scope="col" className="align-middle">Perfil</th>
                        <th scope="col" className="align-middle">Nome</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">Cargo</th>
                        <th scope="col" className="align-middle">Competência</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">E-mail</th>
                        <th scope="col" className="align-middle"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadFillData()}
                </tbody>
            </table>
        )
    }

    loadFillData() {
        return this.state.listaFuncionarios.map((data, index) => {
            return (
                <tr key={index}>
                    <th className="align-middle"></th>
                    <td className="align-middle">{data.name}</td>
                    <td className="align-middle d-none d-sm-table-cell">{data.cargo.cargo}</td>
                    <td></td>
                    <td className="align-middle d-none d-sm-table-cell">{data.email}</td>
                    <td className="align-middle">
                        <IconButton style={{ color: blue['600'] }} component="span">
                            <EditTwoToneIcon />
                        </IconButton>
                        <IconButton component="span">
                            <VisibilityTwoToneIcon />
                        </IconButton>
                        <IconButton style={{ color: red['300'] }} component="span">
                            <DeleteTwoToneIcon />
                        </IconButton>
                    </td>
                </tr>
            )
        })
    }
}