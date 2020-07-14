import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes

import Navbar from '../components/Navbar/Navbar'
import Avatar from '@material-ui/core/Avatar';
import Swal from 'sweetalert2'

//Importação de Icones

import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import { Button, Card, CardDeck, CardGroup } from 'react-bootstrap';


const baseURL = "https://glacial-stream-93235.herokuapp.com"


export default class Projeto extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProjeto: [],
            campNome: "",
            campID: "",
            campCliente: "",
            campDescricao: "",
            campInicio: "",
            campFim: "",
            estado: null,
            listaProjetos: [],
            id: "",
            nome: "",
            tipo: "",
            avatarURL: "",
            projetoId: ""
        }

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
        } else {
            this.setState({
                id: '',
                nome: '',
                tipo: ''
            })
        }


        let projetoId = this.props.match.params.id;
        const url = baseURL + "/projeto/" + projetoId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0]
                    this.setState({
                        dataProjeto: data,
                        campNome: data.projeto.nome,
                        campID: data.id,
                        campCliente: data.projeto.cliente,
                        campDescricao: data.projeto.descricao,
                        campInicio: data.projeto.inicio,
                        campFim: data.projeto.fim,
                        estado: data.projeto.estado,
                        projetoId: data.projetoId
                    })

                    console.log(this.state.projetoId)

                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("Error Server " + error)
            })


        const projetos = "https://glacial-stream-93235.herokuapp.com/lista/projetos/users";
        axios.get(projetos)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaProjetos: data });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + projetos);
            });
    }


    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <h5
                        style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>{this.state.campNome}
                    </h5>
                    {this.state.tipo === 1 ? <Link
                        to="/lista/projetos">
                        <Button style={{ marginTop: -35, borderRadius: 50, width: 110, height: 52, marginRight: 57, backgroundColor: '#ef5350', border: 'none' }}
                            type="button"
                            onClick={() => this.sendDeleteProjeto()}
                            className="btn btn-primary float-right">
                            Eliminar
                        </Button>
                    </Link> : null}
                    {this.state.tipo === 1 ? <Link
                        to="/adicionar/funcionario">
                        <Button style={{ marginTop: -35, borderRadius: 50, width: 110, height: 52, marginRight: 15, backgroundColor: '#546e7a', border: 'none' }}
                            type="button"
                            className="btn btn-primary float-right">
                            Editar
                        </Button>
                    </Link> : null}
                    {this.state.tipo === 1 || this.state.tipo === 2 && this.state.estado === false ?
                        <Button style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 15, backgroundColor: '#43a047', border: 'none' }}
                        type="button"
                        onClick={() => this.UpdateEstado(this.state.projetoId)}
                        className="btn btn-primary float-right">
                        Concluido?
                        </Button>
                        : null}
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <Link
                                        to={"/lista/projetos"}>Projetos
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">{this.state.campNome}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row mr-5 ml-1">
                        <div className="col-xl-4">
                            {this.state.estado === false ?
                                <Card className="border-0 ">
                                    <Card.Body className="ml-4 mt-3 mr-4">
                                        <div>
                                            <div className="d-flex justify-content-end">
                                                <h6
                                                    style={{ fontFamily: 'RegularG', 'fontSize': 18, color: '#2979ff' }}
                                                    className="card-title">
                                                    <span style={{ fontFamily: 'RegularG' }}>Em Progresso</span>
                                                </h6>
                                            </div>
                                            <div style={{ marginTop: -35 }}>
                                                <h5
                                                    style={{ fontFamily: 'BoldG', 'fontSize': 20 }}
                                                    className="card-title mb-3">
                                                    {this.state.campNome}
                                                </h5>
                                                <h6
                                                    style={{ fontFamily: 'RegularG', 'fontSize': 16, marginTop: -5, color: '#2979ff' }}
                                                    className="card-title mb-4">
                                                    <span style={{ fontFamily: 'LightG' }}>{this.state.campCliente}</span>
                                                </h6>
                                                <p style={{ fontSize: 16, fontFamily: 'LightG' }} className="card-text"></p>

                                                <ul>
                                                    <li className="mb-3 mt-2">
                                                        <CalendarTodayTwoToneIcon
                                                            style={{ color: '#1976d2', marginRight: 15 }} />
                                                        <span style={{ fontSize: 16, fontFamily: 'RegularG' }}>{this.state.campInicio}</span>
                                                    </li>
                                                    <li>
                                                        <CalendarTodayTwoToneIcon
                                                            style={{ color: '#1976d2', marginRight: 15 }} />
                                                        <span style={{ fontSize: 16, fontFamily: 'RegularG' }}>{this.state.campFim}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Card.Body >
                                </Card> : null}
                            {this.state.estado === true ?
                                <Card className="border-0 mb-4">
                                    <Card.Body className="ml-4 mt-4 mr-4 mb-4">
                                        <div>
                                            <div className="d-flex justify-content-end">
                                                <h6
                                                    style={{ fontFamily: 'RegularG', 'fontSize': 18, color: '#43a047' }}
                                                    className="card-title">
                                                    <span style={{ fontFamily: 'RegularG' }}>Concluido</span>
                                                </h6>
                                            </div>
                                            <div style={{ marginTop: -35 }}>
                                                <h5
                                                    style={{ fontFamily: 'BoldG', 'fontSize': 20 }}
                                                    className="card-title mb-3">
                                                    {this.state.campNome}
                                                </h5>
                                                <h6
                                                    style={{ fontFamily: 'RegularG', 'fontSize': 16, marginTop: -5, color: '#2979ff' }}
                                                    className="card-title mb-4">
                                                    <span style={{ fontFamily: 'LightG' }}>{this.state.campCliente}</span>
                                                </h6>
                                                <p style={{ fontSize: 16, fontFamily: 'LightG' }} className="card-text"></p>

                                                <ul>
                                                    <li className="mb-3 mt-2">
                                                        <CalendarTodayTwoToneIcon
                                                            style={{ color: '#1976d2', marginRight: 15 }} />
                                                        <span style={{ fontSize: 16, fontFamily: 'RegularG' }}>{this.state.campInicio}</span>
                                                    </li>
                                                    <li>
                                                        <CalendarTodayTwoToneIcon
                                                            style={{ color: '#1976d2', marginRight: 15 }} />
                                                        <span style={{ fontSize: 16, fontFamily: 'RegularG' }}>{this.state.campFim}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </Card.Body >
                                </Card> : null}

                            <Card className="border-0 mb-4 mt-4">
                                <Card.Body className="ml-4 mt-4 mb-4 mr-4">
                                    <h5
                                        style={{ fontFamily: 'BoldG', 'fontSize': 20 }}
                                        className="card-title mb-3">
                                        <AssignmentTwoToneIcon
                                            style={{ fontSize: 28, marginRight: 15, marginTop: -3, color: '#7C4DFF' }} />Descrição do Projeto
                                    </h5>
                                    <p style={{ fontSize: 16, fontFamily: 'LightG' }} className="card-text">{this.state.campDescricao}</p>
                                </Card.Body >
                            </Card>

                        </div>
                        <div className="col-xl-8">
                            <div class="row row-cols-1 row-cols-md-3">
                                {this.loadFillTeamLead()}
                                {this.loadFillDevelopers()}
                            </div>
                        </div>

                    </div>
                </main>
            </div >
        )
    }

    loadFillTeamLead() {
        return this.state.listaProjetos.map((data, index) => {
            if (this.state.campID === data.teamId && data.user.cargo.id === 2) {
                return (
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                        <Card key={index} className="text-center border-0 mb-4 ">
                            <Card.Body >
                                <div className="d-flex justify-content-center mt-4 mb-4">
                                    <Avatar style={{ width: 70, height: 70 }} alt={data.user.nome} src={data.user.avatarURL} />
                                </div>
                                <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title">{data.user.nome}</h5>
                                <p style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -10 }} className="card-text">{data.user.cargo.cargo}</p>
                                <Link style={{ textDecoration: 'none' }} to={"/user/" + data.user.id}><div className="d-flex justify-content-center mb-4"><button style={{ borderRadius: 55, width: 120, height: 40, backgroundColor: '#2C3E50', border: 'none' }} className="btn btn-primary align-middle">Ver Perfil</button></div></Link>
                            </Card.Body>
                        </Card>
                    </div>

                )
            }
        })
    }

    loadFillDevelopers() {
        return this.state.listaProjetos.map((data, index) => {
            if (this.state.campID === data.teamId && data.user.cargo.id === 3) {
                return (
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                        <Card key={index} className="text-center border-0 mb-4 ">
                            <Card.Body >
                                <div className="d-flex justify-content-center mt-4 mb-4">
                                    <Avatar style={{ width: 67, height: 67 }} alt={data.user.nome} src={data.user.avatarURL} />
                                </div>
                                <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title">{data.user.nome}</h5>
                                <p style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -10 }} className="card-text">{data.user.cargo.cargo}</p>
                                <Link style={{ textDecoration: 'none' }} to={"/user/" + data.user.id}><div className="d-flex justify-content-center mb-4"><button style={{ borderRadius: 55, width: 120, height: 40, backgroundColor: '#2C3E50', border: 'none' }} className="btn btn-primary align-middle">Ver Perfil</button></div></Link>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }
        })
    }

    sendDeleteProjeto() {
        const baseUrl = "https://glacial-stream-93235.herokuapp.com/eliminar/equipa/projeto"
        this.state.listaProjetos.map((data, index) => {
            if (this.state.campID === data.teamId) {
                axios.post(baseUrl, {
                    id: this.state.projetoId,
                    idEquipa: this.state.campID,
                    idUser: data.userId
                })
                    .then(response => {
                        if (response.data.success) {
                            Swal.fire(
                                'Eliminado',
                                'O Projeto ' + this.state.campNome + ' foi Eliminado!',
                                'success'
                            )
                        }
                    })

                    .catch(error => {
                        alert("Error 325")
                    })

                console.log(data.id)
            }

        })
    }

    UpdateEstado(projetoId) {

        const baseUrl = "https://glacial-stream-93235.herokuapp.com/teamlead/update/estado/projeto"

        this.state.listaProjetos.map((data, index) => {
            axios.post(baseUrl, {
                id: projetoId,
                idUser: data.user.id
            })
                .then(response => {
                    if (response.data.success) {
                        Swal.fire(
                            'Parabéns',
                            'O Teu Projeto foi Concluido!',
                            'success'
                        )

                        window.location.reload()
                    }
                })

                .catch(error => {
                    alert("Error 325")
                })

            console.log(data.id)

        })
    }

}