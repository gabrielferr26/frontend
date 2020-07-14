import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import '../style.css'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import IconButton from '@material-ui/core/IconButton';
import CardProjetos from '../components/Cards/CardTotalProjetos'
import CardCountProjetosCurso from '../components/Cards/CardProjetosProgresso'
import CardProjetosCurso from '../components/Lists/ListaProjetosUser'
import CardHistorioProjetos from '../components/Lists/ListaHistoricoProjetos'
import CardTodosProjetos from '../components/Lists/TodosProjetos'
import CardUsersDisponiveis from '../components/Cards/CardUsersDisponiveis'
import CardSkills from '../components/Cards/CardTotalSkills'
import CardUltimosProjetos from '../components/Lists/UltimosProjetos'
import CardProjetosProgresso from '../components/Lists/ProjetosProgresso'
import CardAvalicao from '../components/Cards/CardAvaliacao'


//Importação de Icones
import { Button, Card } from 'react-bootstrap';


export default class ListaProjetos extends React.Component {

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
        }
        else {
            this.setState({
                id: '',
                nome: '',
                tipo: ''
            })
        }

        //Lista de Projetos
        const projetos = "https://glacial-stream-93235.herokuapp.com/lista/projetos";
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
                <main style={{ marginBottom: 100 }}>
                    {this.state.tipo === 2 || this.state.tipo === 3 ? <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Os Meus Projetos</h5> : null}
                    {this.state.tipo === 1 ? <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Projetos</h5> : null}
                    {this.state.tipo === 1 ?
                        <Link
                            to="/adicionar/projeto">
                            <Button
                                style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none', fontFamily: 'LightG' }}
                                type="button"
                                className="btn btn-primary float-right">
                                Adicionar
                            </Button>
                        </Link> : null}
                    {this.state.tipo === 2 ?
                        <Link
                            to="/criarequipa">
                            <Button
                                style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none', fontFamily: 'LightG' }}
                                type="button"
                                className="btn btn-primary float-right">
                                Criar Equipa
                            </Button>
                        </Link> : null}
                    <div style={{ marginTop: -22 }} className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li
                                    className="breadcrumb-item">
                                    <Link
                                        to={"/dashboard"}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page">Projetos
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <React.Fragment>
                        <div style={{ marginTop: -15 }} className="row ml-1 mr-4">
                            <CardProjetos />
                            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
                                <CardCountProjetosCurso />
                            </div>
                            <CardSkills />
                            {this.state.tipo === 1 ? <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
                                <CardUsersDisponiveis />
                            </div> : null}
                            {this.state.tipo === 2 || this.state.tipo === 3 ? <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
                                <CardAvalicao />
                            </div> : null}


                        </div>
                    </React.Fragment>
                    {this.state.tipo === 2 || this.state.tipo === 3 ?
                        <React.Fragment >
                            <div className="row ml-1 mr-4">
                                <div className="col-xl-4">
                                    <CardHistorioProjetos titulo="Histórico de Projetos" />
                                </div>
                                <div className="col-xl-5">
                                    <CardProjetosCurso titulo="Projetos em Curso" />
                                </div>
                            </div>
                        </React.Fragment> : null}
                    {this.state.tipo === 1 ?
                        <React.Fragment >
                            <div className="row ml-1 mr-3">
                                <div className="col-xl-6 col-lg-6">
                                    <CardProjetosProgresso titulo="Em Progresso" />
                                </div>
                                <div className="col-xl-3 col-lg-6">
                                    <CardUltimosProjetos titulo="Últimos Projetos" />
                                </div>
                                <div className="col-xl-3">
                                    <CardTodosProjetos titulo="Histórico" />
                                </div>
                            </div>
                        </React.Fragment> : null}
                </main>
            </div >
        )
    }

}