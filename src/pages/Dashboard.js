import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import CardTeamLead from '../components/Cards/CardTeamLead'
import CardTotalUsers from '../components/Cards/CardsTotalUsers'
import CardTotalSkills from '../components/Cards/CardTotalSkills'
import CardTotalInteresses from '../components/Cards/CardTotalInteresses'
import CardTotalProjetos from '../components/Cards/CardTotalProjetos'
import ListaDevelopers from '../components/Lists/ListaDevelopers'
import HorizontalBar from '../components/Charts/HorizontalBarChart'
import MyProjects from '../components/Lists/ListaProjetosUser'
import { Button } from 'react-bootstrap'


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaFuncionario: [],
            id: "",
            nome: "",
            avatarURL: "",
            tipo: "",
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
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <Navbar />
                </header >
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Dashboard</h5>
                    {this.state.tipo === 2 ?
                        <Link to={"/criarequipa"}>
                            <Button
                                style={{ marginTop: -40, borderRadius: 50, width: 150, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }}
                                type="button"
                                className="float-right">
                                <span>Criar Equipa</span>
                            </Button>
                        </Link>
                        : null}
                    {this.state.tipo === 1 ?
                        <Link to={"/criarequipa"}>
                            <Button
                                style={{ marginTop: -40, borderRadius: 50, width: 150, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }}
                                type="button"
                                className="float-right">
                                <span>Adicionar</span>
                            </Button>
                        </Link>
                        : null}

                    <h6 style={{ fontFamily: 'RegularG', fontSize: 16 }} className="ml-3">Bem Vindo , <span style={{ fontFamily: 'BoldG' }}>{this.state.nome}</span></h6>
                    <div className="row col-xl-12">
                        {this.state.tipo === 2 || this.state.tipo === 3 ?
                            <React.Fragment>
                                <CardTotalUsers />
                                <CardTotalInteresses />
                                <CardTotalSkills />
                                <CardTotalProjetos />
                                <ListaDevelopers />
                                <HorizontalBar />
                                <div className="col-xl-4 order-second col-lg-6 col-md-12 mb-5">
                                    <MyProjects titulo="Projetos em Curso" />
                                </div>

                            </React.Fragment> : null}


                        {this.state.tipo === 1 ?
                            <React.Fragment>
                                <CardTotalUsers />
                                <CardTotalInteresses />
                                <CardTotalSkills />
                                <CardTotalProjetos />
                                <ListaDevelopers />
                                <HorizontalBar />
                                <CardTeamLead />
                            </React.Fragment> : null}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}
