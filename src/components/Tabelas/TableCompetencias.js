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

//Importação de Componentes
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Swal from 'sweetalert2'

class GroupAvatars extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listaFuncionarios: []
        }
    }

    componentDidMount() {
        const url = "http://localhost:3000/"
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaFuncionarios: data })
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert(error)
            });
    }
    render() {
        return (
            <AvatarGroup max={4}>
                <Avatar alt="Gabriel Ferreira" src="../../assets/images/user_image1.jpg" />
                <Avatar alt="Inês Almeida" src="../../assets/images/user_image1.jpg" />
                <Avatar alt="Pedro Lourenço" src="../../assets/images/user_image1.jpg" />
                <Avatar alt="Claudio Baptista" src="../../assets/images/user_image1.jpg" />
                <Avatar alt="Claudio Ferreira" src="../../assets/images/user_image1.jpg" />
            </AvatarGroup>
        );
    }
}


class ListCompetencia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaCompetencias: []
        }
    }

    componentDidMount() {
        const url = "http://localhost:3000/lista/competencias"
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaCompetencias: data })
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("Erro:" + error + "- URL: " + url);
            });
    }

    render() {
        return (
            <table className="table table-light table-borderless table-hover">
                <thead>
                    <tr className="heigher " style={{ color: blue['600'] }}>
                        <th scope="col" className="align-middle">Nome</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">Categoria</th>
                        <th scope="col" className="align-middle ">Developers</th>
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
        return this.state.listaCompetencias.map((data, index) => {
            return (
                <tr key={index}>
                    <th className="align-middle">{data.competencia}</th>
                    <td className="align-middle">{data.categoria.categoria}</td>
                    <td></td>
                    <td className="align-middle">
                        <Link to={"/editar/competencia/" + data.id}><IconButton style={{ color: blue['600'] }} component="span">
                            <EditTwoToneIcon />
                        </IconButton>
                        </Link>
                        <Link to={"/competencia/" + data.id}><IconButton component="span">
                            <VisibilityTwoToneIcon />
                        </IconButton>
                        </Link>
                        <IconButton onClick={() => this.onDelete(data.id)} style={{ color: red['300'] }} component="span">
                            <DeleteTwoToneIcon />
                        </IconButton>
                    </td>
                </tr>
            )

        })
    }

    onDelete(id) {
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Estes dados não serão recuperados',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Apagar',
            cancelButtonText: 'Cancelar',
        })
            .then((result) => {
                if (result.value) {
                    this.sendDelete(id)
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelado',
                    )
                }
            })


    }

    sendDelete(competenciaid) {
        //URL DO BACKEND
        const baseUrl = "http://localhost:3000/eliminar/competencia"

        axios.post(baseUrl, {
            id: competenciaid
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Eliminado',
                        'A Competencia foi Eliminada',
                        'success'
                    )
                }
                this.loadCompetencias()
            })

            .catch(error => {
                alert("Error 325")
            })
    }

    componentDidMount() {
        this.loadCompetencias();
    }

    loadCompetencias() {
        const url = "http://localhost:3000/lista/competencias"
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaCompetencias: data })
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert(error)
            });
    }

} export default ListCompetencia