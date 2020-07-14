import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'
import {
    BrowserRouter as Router,
    Link, Redirect
} from "react-router-dom";

import AuthService from '../../pages/Auth.Service'

//Importação de Componentes

import IconButton from '@material-ui/core/IconButton';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import Avatar from '@material-ui/core/Avatar';

export default class Navbar extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            id: "",
            nome: "",
            tipo: "",
            avatarURL: "",
            redirect: false
        }

        this.logOut = this.logOut.bind(this)
    }

    logOut() {
        AuthService.logout()
        this.setState({ redirect: true })
    }

    componentDidMount() {
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
    }


    render() {

        const { redirect } = this.state
        if (redirect) {
            return <Redirect to={{
                pathname: "/"
            }} />;
        }

        return (
            <div>
                <nav style={{ backgroundColor: '#1976d2' }} className="navbar navbar-dark">
                    <Link to={"/dashboard"}>
                        <span className="navbar-brand ml-5">
                            <img src={(require('../../assets/icons/LogoBizdirectTeams.png'))}
                                width="25"
                                height="25"
                                className="d-inline-block align-center mr-3 ml-2"
                                alt="Logotipo Bizdirect by Teams" />
                            <span
                                style={{ fontFamily: 'BoldG', fontSize: 20 }}>
                                Bizdirect
                            <span
                                    style={{ fontFamily: 'LightG' }}
                                    className="ml-2">
                                    by Teams
                            </span>
                            </span>
                        </span>
                    </Link>
                    <div className="d-flex justify-content-end">
                        {this.state.tipo === 2 || this.state.tipo === 3 ?
                            <Link to={"/user/" + this.state.id}><Avatar style={{ marginRight: 15, marginTop: 7, width: 35, height: 35 }}
                                alt={this.state.nome}
                                src={this.state.avatarURL} /></Link> : null}
                        <span className="d-none d-sm-block"
                            style={{ marginTop: 12, color: 'white', fontFamily: 'LightG', marginRight: 20 }}>
                            {this.state.nome}
                        </span>
                        <IconButton
                            onClick={() => this.logOut()}>
                            <ExitToAppTwoToneIcon
                                style={{ color: 'white', width: 22 }} />
                        </IconButton>
                    </div>

                </nav>
                <nav className="navbar navbar-down navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon ml-5"></span>
                    </button>
                    <div className="collapse navbar-collapse ml-5" style={{ fontFamily: 'RegularG', fontSize: 16, color: 'black' }} id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mr-4">
                                <span className="nav-link">
                                    <Link style={{ color: 'black', textDecoration: 'none' }}
                                        to="/dashboard">Dashboard
                                    </Link>
                                </span>
                            </li>
                            {this.state.tipo === 2 || this.state.tipo === 3 ? <li className="nav-item mr-4">
                                <span className="nav-link">
                                    <Link style={{ color: 'black', textDecoration: 'none' }}
                                        to={"/user/" + this.state.id}>Perfil
                                    </Link>
                                </span>
                            </li> : null}
                            {this.state.tipo === 2 || this.state.tipo === 3 ? <li className="nav-item mr-4">
                                <span className="nav-link">
                                    <Link style={{ color: 'black', textDecoration: 'none' }}
                                        to={"/lista/projetos"}>Projetos
                                    </Link>
                                </span>
                            </li> : null}
                            {this.state.tipo === 2 || this.state.tipo === 3 ? <li className="nav-item mr-4">
                                <span className="nav-link">
                                    <Link style={{ color: 'black', textDecoration: 'none' }}
                                        to={"/social"}>Developers
                                    </Link>
                                </span>
                            </li> : null}
                            {this.state.tipo === 1 ? <li className="nav-item dropdown bg-transparent mr-4">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    role="button"
                                    aria-expanded="false">
                                    Funcionários
                                </span>
                                <div style={{ fontFamily: 'RegularG', fontSize: 14 }} className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/lista/developers"}>
                                        <span
                                            className="dropdown-item">Developers
                                        </span>
                                    </Link>
                                    {this.state.tipo === 1 ?
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to="/adicionar/funcionario">
                                            <span className="dropdown-item">Adicionar</span>
                                        </Link> : null}
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/lista/teamlead"}>
                                        <span className="dropdown-item">TeamLeads</span>
                                    </Link>
                                    {this.state.id === 1 ?
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to="/lista/funcionarios">
                                            <span className="dropdown-item">Todos os Funcionários</span>
                                        </Link> : null}
                                </div>
                            </li> : null}
                            {this.state.tipo === 1 ? <li className="nav-item dropdown mr-4">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Projetos e Equipas
                                </span>
                                <div className="dropdown-menu" style={{ fontFamily: 'RegularG', fontSize: 14 }} aria-labelledby="navbarDropdown">
                                    {this.state.tipo === 1 ? <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/lista/projetos"}>
                                        <span className="dropdown-item">Projetos</span>
                                    </Link> : null}
                                    {this.state.tipo === 1 ? <Link
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        to={"/adicionar/projeto"}>
                                        <span className="dropdown-item">Adicionar Projeto</span>
                                    </Link> : null}
                                    {this.state.tipo === 1 ? <Link
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        to={"/lista/allprojetos"}>
                                        <span className="dropdown-item">Todos os Projetos</span>
                                    </Link> : null}
                                </div>
                            </li> : null}
                            {this.state.tipo === 1 ? < li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Competências e Interesses
                                </span>
                                <div className="dropdown-menu" style={{ fontFamily: 'RegularG', fontSize: 14 }} aria-labelledby="navbarDropdown">
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/lista/skills"}>
                                        <span className="dropdown-item">Skills</span>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/adicionar/skill"}>
                                        <span className="dropdown-item">Adicionar Skills</span>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/lista/interesses"}>
                                        <span className="dropdown-item">Interesses</span>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/adicionar/interesse"}>
                                        <span className="dropdown-item">Adicionar Interesses</span>
                                    </Link>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={"/adicionar/habilitacao"}>
                                        <span className="dropdown-item">Adicionar Habilitação</span>
                                    </Link>
                                </div>
                            </li> : null}

                        </ul>
                    </div>
                </nav>
            </div >
        )
    }
}