import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import Select from 'react-select'
import Avatar from '@material-ui/core/Avatar'

//Importaçaõ de Icones
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';

import Swal from 'sweetalert2'
import { Button, Card } from 'react-bootstrap';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export default class AdicionarProjeto extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            //Database
            listaFuncionarios: [],
            listaTeamLead: [],
            //Database
            campNome: "",
            campDescricao: "",
            dataInicio: "",
            dataFim: "",
            campCliente: "",
            funcionarioSelect: [],
            selectTeamLead: 0,
        };

    }



    //Escolher Team Lead do Projeto
    handleChangeSelectTeamLead = selectTeamLead => {
        const state = this.state
        state.selectTeamLead = 0

        if (selectTeamLead) {
            state.selectTeamLead = selectTeamLead.value
        }

        this.setState(state)
        console.log(`Options selected:`, JSON.stringify(state.selectTeamLead, null))
    }


    //Escolher Elementos de um Projeto
    handleChangeSelectFuncionarios = funcionarioSelecionados => {
        const state = this.state
        state.funcionarioSelect = []

        if (funcionarioSelecionados) {
            funcionarioSelecionados.forEach((option) => {
                state.funcionarioSelect.push(option.value)
            })
        }


        //Atualiza o Array
        this.setState(state)
        console.log(`Interesses Selecionados:`, JSON.stringify(state.funcionarioSelect, null))
    }


    componentDidMount() {

        const url = "https://glacial-stream-93235.herokuapp.com/lista/developers";
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

        //Lista de Team Lead
        const url1 = "https://glacial-stream-93235.herokuapp.com/lista/teamlead";
        axios.get(url1)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaTeamLead: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + url1);
            });
    }


    render() {

        const { selectedOption } = this.state;

        return (
            <div>
                <Navbar />
                <main>
                    <h5
                        style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Adicionar Projeto
                    </h5>
                    <Link to={"/lista/projetos"}>
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }}
                            onClick={() => this.sendSave()}
                            type="button"
                            className="btn btn-primary float-right">Guardar
                    </Button>
                    </Link>
                    <Link to={"/lista/projetos"}>
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 10, backgroundColor: '#ef5350', border: 'none' }}
                            type="button"
                            className="btn  float-right">Cancelar
                        </Button>
                    </Link>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li
                                    className="breadcrumb-item">
                                    <Link
                                        to={"/dashboard"}>Dashboard
                                     </Link>
                                </li>
                                <li
                                    className="breadcrumb-item">
                                    <Link
                                        to={"/lista/projetos"}>Projetos
                                     </Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page">Adicionar Projeto
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-4">
                        <div className="col-xl-4">
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}><LayersTwoToneIcon style={{ fontSize: 35, marginRight: 15, marginTop: -3, color: '#26A69A' }} />Dados do Projeto</h5>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nome:</label>
                                        <input type="text" className="form-control" placeholder="Inserir um Nome" value={this.state.campNome}
                                            onChange={(value) => this.setState({ campNome: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nome Cliente:</label>
                                        <input type="text" className="form-control" placeholder="Inserir um Nome" value={this.state.campCliente}
                                            onChange={(value) => this.setState({ campCliente: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Inicio do Projeto:</label>
                                        <input type="date" className="form-control" placeholder="Inserir uma Data" value={this.state.dataInicio}
                                            onChange={(value) => this.setState({ dataInicio: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Fim do Projeto:</label>
                                        <input type="date" className="form-control" placeholder="Inserir uma Data" value={this.state.dataFim}
                                            onChange={(value) => this.setState({ dataFim: value.target.value })} />
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}><AssignmentTwoToneIcon style={{ fontSize: 30, marginRight: 15, marginTop: -3, color: '#7C4DFF' }} />Descrição do Projeto</h5>
                                    <div className="mt-3">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.campDescricao}
                                            onChange={(value) => this.setState({ campDescricao: value.target.value })} placeholder="Inserir uma Breve Descrição do Projeto" />
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-4">
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}><AccountCircleTwoToneIcon style={{ fontSize: 30, marginRight: 15, marginTop: -3, color: '#1976d2' }} />Dados da Equipa</h5>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nome Equipa:</label>
                                        <input type="text" className="form-control" placeholder="Inserir um Nome" value={this.state.campEquipa}
                                            onChange={(value) => this.setState({ campEquipa: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Team Lead:</label>
                                        <Select
                                            onChange={this.handleChangeSelectTeamLead}
                                            value={selectedOption}
                                            placeholder="Inserir Team Lead"
                                            options={this.loadFillTeamLead()} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Elementos da Equipa:</label>
                                        <Select
                                            isMulti
                                            options={this.loadFillFuncionarios()}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecionar os Funcionários"
                                            onChange={this.handleChangeSelectFuncionarios}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        {this.state.funcionarioSelect > 0 || this.state.selectTeamLead > 0 ? <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                            <div style={{ border: 'none', fontFamily: 'RegularG' }} className="card pb-3">
                                <div className="card-header-profile d-flex justify-content-center">
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush mt-4">
                                        {this.state.selectTeamLead > 0 ? <h5 style={{ fontFamily: 'BoldG' }} className="card-title-name d-flex justify-content-left ml-3">Team Lead</h5> : null}
                                        {this.loadFillNovoTeamLead()}
                                    </ul>
                                    <ul className="list-group list-group-flush mt-1">
                                        {this.state.funcionarioSelect ? <h5 style={{ fontFamily: 'BoldG' }} className="card-title-name d-flex justify-content-left ml-3">Developers</h5> : null}
                                        {this.loadFillNovosFuncionarios()}
                                    </ul>
                                </div>
                            </div>
                        </div> : null}
                    </div>
                </main >
            </div >
        )
    }

    //Lista de Funcionarios - Base de Dados
    loadFillFuncionarios() {
        return this.state.listaFuncionarios.map((data, index) => {
            return (
                { value: data.id, label: data.nome }
            )
        })
    }

    //Lista de Team Leads - Base de Dados
    loadFillTeamLead() {
        return this.state.listaTeamLead.map((data, index) => {
            return (
                { value: data.id, label: data.nome }
            )
        })
    }

    //Lista de Team Lead
    loadFillNovoTeamLead() {
        return this.state.listaTeamLead.map((data, index) => {
            if (this.state.selectTeamLead === data.id) {
                return (
                    <li key={index} className="list-group-item d-flex justify-content-left border-0 ">
                        <Avatar style={{ width: 55, height: 55 }} alt={data.name} src={data.avatarURL} />
                        <div><span style={{ fontFamily: 'BoldG', fontSize: 18 }} className="d-flex mt-1 justify-content-start ml-3">{data.nome}</span>
                            <span style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -5 }} className="d-flex justify-content-start ml-3">{data.cargo.cargo}</span>
                        </div>
                    </li>
                )
            }

        })
    }

    //Lista de Funcionarios Escolhidos
    loadFillNovosFuncionarios() {
        return this.state.listaFuncionarios.map((data, index) => {
            return this.state.funcionarioSelect.map((data1, index1) => {
                if (data1 === data.id) {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-left border-0 ">
                            <Avatar style={{ width: 55, height: 55 }} alt={data.name} src={data.avatarURL} />
                            <div><span style={{ fontFamily: 'BoldG', fontSize: 18 }} className="d-flex mt-1 justify-content-start ml-3">{data.nome}</span>
                                <span style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -5 }} className="d-flex justify-content-start ml-3">{data.email}</span>
                            </div>
                        </li>
                    )
                }
            })
        })
    }

    //Guardar o Projeto
    sendSave() {


        if (this.state.campNome === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Preencher Campos Obrigatórios',
            })
        }
        else {
            const baseURL = "https://glacial-stream-93235.herokuapp.com/admin/adicionar/projeto"
            const datapost = {
                nomeProjeto: this.state.campNome,
                nomeEquipa: this.state.campEquipa,
                cliente: this.state.campCliente,
                descricao: this.state.campDescricao,
                inicio: this.state.dataInicio,
                fim: this.state.dataFim,
                teamLead: this.state.selectTeamLead,
                funcionarios: this.state.funcionarioSelect



            }

            axios.post(baseURL, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'O Projeto ' + this.state.campNome + ' foi Adicionado',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                    }
                    else {
                        alert(response.data.message)
                    }
                })

                .catch(error => {
                    alert("Error 34" + error)
                })
        }
    }
}