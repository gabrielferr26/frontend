import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


//Importação de Compoentes
import Navbar from '../components/Navbar/Navbar'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'



//Importação de Icones
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';




export default class ListaDeveloper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaProjetos: [],
            id: "",
            nome: "",
            tipo: "",
            avatarURL: ""
        };
    }

    componentDidMount() {

        //Verificar User
        this.userData = JSON.parse(localStorage.getItem('funcionario'));
        if (localStorage.getItem('funcionario')) {
            this.setState({
                id: this.userData.id,
                nome: this.userData.nome,
                tipo: this.userData.tipo,
                avatarURL: this.userData.avatar
            })

            console.log(this.userData.tipo)
        }
        else {
            this.setState({
                id: '',
                nome: '',
                tipo: ''
            })
        }

        const projetos = "http://localhost:3000/lista/projetos";
        axios.get(projetos)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaProjetos: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + projetos);
            });
    }

    render() {
        return (
            <div>
                <Navbar />
                <main style={{ marginBottom: 100, marginRight: 70 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Todos os Projetos</h5>
                    
                        <Link to="/adicionar/projeto">
                            <Button
                                style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 15, backgroundColor: '#1976d2', border: 'none' }}
                                type="button"
                                className="btn btn-primary float-right">
                                Adicionar
                            </Button>
                        </Link> 
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to={"/lista/projetos"}>Projetos
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Lista de Projetos</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-12 mr-4 ">
                        <table className="table table-borderless table-hover ml-1 mt-4" >
                            <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {this.loadFillProjetos()}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        )
    }

    loadFillProjetos() {
        return this.state.listaProjetos.map((data, index) => {
            if (data.projeto.estado === false) {
                return (
                    <tr key={index}>
                        <td className="align-middle"><span style={{ fontFamily: 'BoldG', fontSize: 16, marginLeft:30 }}>{data.projeto.nome}</span></td>
                        <td className="align-middle"><span style={{ color: '#1976d2', fontFamily: 'BoldG', fontSize: 16 }}>Em Progresso</span></td>
                        <td>
                            <AvatarGroup style={{ marginTop: 6 }} max={6}>
                                {this.loadFillUsers(data.projeto.id)}
                            </AvatarGroup>
                        </td>
                        < td className="align-middle d-flex justify-content-end">
                            <IconButton>
                                <EditTwoToneIcon
                                    style={{ color: '#1976d2', fontSize: 22 }} />
                            </IconButton>
                            <IconButton
                                onClick={() => this.sendDeleteProjeto(data.projeto.id, data.id)}>
                                <DeleteTwoToneIcon
                                    style={{ color: '#ef5350', fontSize: 22 }} />
                            </IconButton>
                            <Link
                                to={"/projeto/" + data.projeto.id}>
                                <IconButton>
                                    <ArrowForwardIosTwoToneIcon
                                        style={{ fontSize: 20 }} />
                                </IconButton>
                            </Link>
                        </td>
                    </tr >
                )
            }

            if (data.projeto.estado === true) {
                return (
                    <tr key={index}>
                        <td className="align-middle"><span style={{ fontFamily: 'BoldG', fontSize: 16, marginLeft:30 }}>{data.projeto.nome}</span></td>
                        <td className="align-middle"><span style={{ color: '#43a047', fontFamily: 'BoldG', fontSize: 16 }}>Finalizado</span></td>
                        <td>
                            <AvatarGroup style={{ marginTop: 6 }} max={6}>
                                {this.loadFillUsers(data.projeto.id)}
                            </AvatarGroup>
                        </td>
                        <td className="align-middle d-flex justify-content-end">
                            <IconButton>
                                <EditTwoToneIcon
                                    style={{ color: '#1976d2', fontSize: 22 }} />
                            </IconButton>
                            <IconButton
                                onClick={() => this.sendDeleteProjeto(data.projeto.id, data.id)}>
                                <DeleteTwoToneIcon
                                    style={{ color: '#ef5350', fontSize: 22 }} />
                            </IconButton>
                            <Link
                                to={"/projeto/" + data.projeto.id}>
                                <IconButton>
                                    <ArrowForwardIosTwoToneIcon
                                        style={{ fontSize: 20 }} />
                                </IconButton>
                            </Link>
                        </td>
                    </tr>
                )
            }
        })
    }

    loadFillUsers(aux) {
        return this.state.listaProjetos.map((data, index) => {
            if (data.projetoId === aux) {
                return data.users.map((data1, index1) => {
                    return (
                        <Avatar key={index1} alt={data1.nome} src={data1.avatarURL} />
                    )
                })
            }
        })
    }

    sendDeleteProjeto(projetoId, equipaId) {

        const baseUrl = "http://localhost:3000/teamlead/eliminar/equipa/projeto"

        axios.post(baseUrl, {
            id: projetoId,
            idEquipa: equipaId

        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Eliminado',
                        'O Projeto foi Eliminado!',
                        'success'
                    )
                    this.loadFillTable()
                }
            })

            .catch(error => {
                alert("Error 325")
            })

    }

    componentDidMount() {
        this.loadFillTable()
    }

    loadFillTable() {

        const projetos = "http://localhost:3000/lista/projetos";
        axios.get(projetos)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaProjetos: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + projetos);
            });

    }
}