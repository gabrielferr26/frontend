import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import Avatar from '@material-ui/core/Avatar';
import FingerprintTwoToneIcon from '@material-ui/icons/FingerprintTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import SmartphoneTwoToneIcon from '@material-ui/icons/SmartphoneTwoTone';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import { ProgressBar, Card, Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SchoolTwoToneIcon from '@material-ui/icons/SchoolTwoTone';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import BuildTwoToneIcon from '@material-ui/icons/BuildTwoTone';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import Swal from 'sweetalert2'




const baseURL = "http://localhost:3000";

export default class Perfil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataFuncionario: {},
            listaSkills: [],
            listaInteresses: [],
            listaHabilitacoes: [],
            listaProjetos: [],

            campNome: "",
            campID: "",
            campCargo: "",
            campEmail: "",
            campTelemovel: "",
            campNacionalidade: "",
            campLocalidade: "",
            campDescription: "",
            campCompetencia: "",
            campAnosExperiencia: "",
            id: "",
            nome: "",
            tipo: "",
            avatarURL: ""

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
        }
        else {
            this.setState({
                id: '',
                nome: '',
                tipo: ''
            })
        }

        //Informações do Utilizador
        let userId = this.props.match.params.id;
        const url = baseURL + "/user/" + userId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0]
                    this.setState({
                        dataFuncionario: data,
                        campNome: data.nome,
                        campID: data.id,
                        campAvatar: data.avatarURL,
                        stringCargo: data.cargo.cargo,
                        campEmail: data.email,
                        campTelemovel: data.telemovel,
                        campNacionalidade: data.nacionalidade,
                        campLocalidade: data.morada,
                        campDescription: data.sobre,
                        campAnosExperiencia: data.anos_experiencia
                    })
                    console.log(JSON.stringify(data.cargo.cargo))
                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("Error Server " + error)
            })

        //Lista de Skills de um Dado User
        let skillId = this.props.match.params.id;
        const urlSkill = baseURL + "/user/skills/" + skillId;
        axios.get(urlSkill)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaSkills: data });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + urlSkill);
            });

        //Lista de Interesses de um Dado User
        let interesseId = this.props.match.params.id;
        const urlInteresse = baseURL + "/user/interesses/" + interesseId;
        axios.get(urlInteresse)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaInteresses: data });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + urlInteresse);
            });

        //Lista de Projetos de um Dado User
        let projetoId = this.props.match.params.id;
        const urlProjeto = baseURL + "/user/projetos/" + projetoId;
        axios.get(urlProjeto)
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
                alert("ERRO: " + error + " - URL: " + urlProjeto);
            });

        //Lista de Habiitacoes de um Dado User
        let habilitacaoId = this.props.match.params.id;
        const urlHabilitacao = baseURL + "/user/habilitacao/" + habilitacaoId;
        axios.get(urlHabilitacao)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaHabilitacoes: data });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + urlHabilitacao);
            });
    }


    render() {
        return (
            <div>
                <Navbar />
                <main style={{ marginTop: 70, marginBottom: 70 }}>
                    <div className="row mr-4 ml-1">
                        <div className="col-xl-3 col-lg-5 col-md-12 col-sm-12">
                            <div style={{ border: 'none' }} className="card card-profile">
                                <div className="d-flex justify-content-end mr-3 mt-3">
                                    {this.state.tipo === 1 ?
                                        <Link to="/lista/developers">
                                            <IconButton onClick={() => this.deleteUser()}>
                                                <DeleteTwoToneIcon
                                                    style={{ color: '#F25050' }} />
                                            </IconButton>
                                        </Link> : null}

                                </div>
                                {this.state.tipo === 1 ? <div className="card-header-profile d-flex justify-content-center">
                                    <Avatar style={{ width: 90, height: 90 }} alt={this.state.campNome} src={this.state.campAvatar} />
                                </div> : null}
                                {this.state.tipo === 2 || this.state.tipo === 3 ? <div className="card-header-profile d-flex justify-content-center mt-5">
                                    <Avatar style={{ width: 90, height: 90 }} alt={this.state.campNome} src={this.state.campAvatar} />
                                </div> : null}
                                <div className="card-body ">
                                    <h5 style={{ fontFamily: 'BoldG' }} className="card-title-name d-flex justify-content-center">{this.state.campNome}</h5>
                                    <p style={{ fontFamily: 'RegularG', marginTop: -10 }} className="card-label  d-flex justify-content-center">{this.state.stringCargo}</p>
                                    {this.state.id === this.state.campID || this.state.tipo === 1 ? <div className="d-flex justify-content-center">
                                        <Link to={"/editar/user/" + this.state.campID}>
                                            <Button
                                                style={{ borderRadius: 55, width: 120, height: 40, backgroundColor: '#2C3E50', border: 'none' }}
                                                className="btn btn-primary align-middle">Editar
                                            </Button>
                                        </Link>
                                    </div> : null}
                                    <ul className="list-group list-group-flush mt-4">
                                        <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Identificação:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">{this.state.campID}</span>
                                            <span className="float-right"><FingerprintTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li>
                                        <li style={{ fontFamily: 'BoldG' }} className="list-group-item">E-mail:<a className="text-decoration-none" href={`mailto:${this.state.campEmail}`}><span style={{ fontFamily: 'RegularG' }} className="item ml-3">{this.state.campEmail}</span></a>
                                            <span className="float-right"><EmailTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li>
                                        <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Telemóvel:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">{this.state.campTelemovel}</span>
                                            <span className="float-right"><SmartphoneTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li>
                                        <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Nacionalidade:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">{this.state.campNacionalidade}</span>
                                            <span className="float-right"><PublicTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li>
                                        <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Localidade:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">{this.state.campLocalidade}</span>
                                            <span className="float-right"><BusinessTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li>
                                        {this.state.campAnosExperiencia > 8 ? <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Experiência:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">Sénior</span>
                                            <span className="float-right"><BuildTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li> : null}
                                        {this.state.campAnosExperiencia < 7 ? <li style={{ fontFamily: 'BoldG' }} className="list-group-item">Experiência:<span style={{ fontFamily: 'RegularG' }} className="item ml-3">Júnior</span>
                                            <span className="float-right"><BuildTwoToneIcon style={{ color: '#1976d2' }} /></span>
                                        </li> : null}
                                    </ul>

                                </div>
                            </div>
                            <Card style={{ border: 'none' }} className="card mt-4 mb-4">
                                <Card.Body className="card-body ml-3 mt-3 mb-3 ">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title ">
                                        <InfoTwoToneIcon style={{ color: '#5c6bc0', marginRight: 15, marginTop: -5, fontSize: 30 }} />Sobre mim</h5>
                                    <ul className="list-group list-group-flush mt-4">
                                        <li style={{ lineHeight: 1.7 }} className="mr-3">
                                            {this.state.campDescription}
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-4 col-lg-7 col-md-12 col-sm-12">
                            <Card className="border-0">
                                <Card.Body className="ml-4 mt-4 ">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title">
                                        <WorkTwoToneIcon style={{ color: '#1976d2', marginRight: 15, fontSize: 30, marginTop: -5 }} />Minhas Skills</h5>
                                    <ul style={{ marginLeft: -15 }} className="list-group list-group-flush mb-3 mt-1">
                                        {this.loadFillNivelCompetencias()}
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card style={{ border: 'none' }} className="card mt-4">
                                <Card.Body className="card-body ml-4 mt-4 ">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title ">
                                        <SchoolTwoToneIcon
                                            style={{ color: '#ffab40', fontSize: 32, marginTop: -5, marginRight: 15 }} />Habilitações Académicas</h5>
                                    <ul style={{ marginLeft: -15 }} className="list-group list-group-flush mt-4">
                                        {this.loadFillHabilitacoes()}
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card style={{ border: 'none' }} className="card mt-4 mb-4">
                                <Card.Body className="card-body ml-4 mt-4 ">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title ">
                                        <FavoriteTwoToneIcon
                                            style={{ color: '#ef5350', fontSize: 28, marginTop: -5, marginRight: 15 }} />Meus Interesses</h5>
                                    <ul style={{ marginLeft: -15 }} className="list-group list-group-flush mt-4">
                                        {this.loadFillInteresses()}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
                            <Card className="card border-0">
                                <Card.Body className="card-body ml-4 mt-4">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title">
                                        <LayersTwoToneIcon style={{ color: '#00897b', fontSize: 32, marginTop: -5, marginRight: 15 }} />Meus Projetos</h5>
                                    <ul style={{ marginLeft: -15 }} className="list-group list-group-flush mt-4">
                                        {this.loadFillProjetos()}
                                    </ul>
                                </Card.Body>
                            </Card>

                        </div>
                    </div>
                </main>
            </div>
        )
    }


    //Skills User + Apresentação do nivel
    loadFillNivelCompetencias() {
        return this.state.listaSkills.map((data, index) => {
            return (
                <li key={index} className="list-group-item border-0">{data.skill.skill}
                    <span className="item"><ProgressBar style={{ backgroundColor: '#1976d2' }} now={data.nivelComp}
                        style={{ marginTop: 8, borderRadius: 50 }} />
                    </span>
                </li>
            )
        })
    }



    //Habilitações User
    loadFillHabilitacoes() {
        return this.state.listaHabilitacoes.map((data, index) => {
            return (
                <li key={index}
                    className="list-group-item  border-0 mb-1">
                    <div>
                        <AccountBalanceTwoToneIcon
                            style={{ color: '#1976d2' }} />
                        <span className="ml-3">{data.instituicao}</span>
                    </div>
                    <div
                        className="mt-2">
                        <SchoolTwoToneIcon
                            style={{ color: '#F29118' }} />
                        <span style={{ fontFamily: 'BoldG' }}
                            className="ml-3">{data.nomecurso}
                            <span style={{ fontFamily: 'RegularG' }}> ({data.curso.curso})
                        </span>
                        </span>
                    </div>
                </li>

            )
        })
    }

    //Interesses User
    loadFillInteresses() {
        return this.state.listaInteresses.map((data, index) => {
            return (
                <li key={index} className="list-group-item  border-0">
                    <div><FavoriteTwoToneIcon style={{ color: '#F25050' }} /><span className="ml-3">{data.interesse.interesse}</span></div>
                </li>
            )
        })
    }


    //Projetos User
    loadFillProjetos() {
        return this.state.listaProjetos.map((data, index) => {
            return (
                <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={"/projeto/" + data.projetoId}>
                    <li key={index} style={{ marginTop: -10 }} className="list-group-item border-0">
                        <span style={{ fontFamily: 'BoldG', fontSize: 17 }}>{data.projeto.nome}</span>
                        <div><span style={{ fontFamily: 'RegularG', fontSize: 17 }}>{data.projeto.cliente}</span></div>
                        <div className="d-flex justify-content-end">
                            <AvatarGroup style={{ marginTop: -50 }} max={6}>
                                {this.loadFillUsers(data.projeto.id)}
                            </AvatarGroup>
                        </div>
                    </li>
                </Link>
            )
        })
    }

    loadFillUsers(aux) {
        return this.state.listaProjetos.map((data, index) => {
            if (data.projetoId === aux)
                return data.users.map((data1, index1) => {
                    return (
                        <Avatar key={index1} alt={data1.nome} src={data1.avatarURL} />
                    )
                })

        })
    }

    //Eliminar um User
    deleteUser() {

        let userId = this.props.match.params.id
        const url = baseURL + "/admin/eliminar/user/" + userId;

        axios.post(url, {
            id: userId,
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Success',
                        'Alterações Efetuadas com Sucesso!',
                        'success'
                    )
                }
            })
            .catch(error => {
                alert("Error 325")
            })

        console.log(userId)
    }

}