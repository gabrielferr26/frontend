
import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link,
    useHistory,
    Redirect
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import Select from 'react-select'
import Swal from 'sweetalert2'




//Importação de Icones
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import ShuffleTwoToneIcon from '@material-ui/icons/ShuffleTwoTone';
import CallMadeTwoToneIcon from '@material-ui/icons/CallMadeTwoTone';
import ArrowForwardTwoToneIcon from '@material-ui/icons/ArrowForwardTwoTone';
import { data } from 'jquery';

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

const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
]



export default class CriarEquipa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaSkills: [],
            listaInteresses: [],
            campNomeEquipa: "",
            selectElementos: 0,
            campNomeProjeto: "",
            campCliente: "",
            dataInicio: "",
            dataFim: "",
            campDescricao: "",
            selectSkill: [],
            selectInteresses: [],
            listaEquipas: [],
            id5: "",
            redirect: false,
            selected: "",
            listaCompare: [],
            id: "",
            nome: "",
            tipo: "",
            avatarURL: ""

        };
    }

    //Selecionar Numero de Elementos
    handleChangeSelectElementos = selectElementos => {
        const state = this.state
        state.selectElementos = ""

        if (selectElementos) {
            state.selectElementos = selectElementos.value
        }

        this.setState(state)
        console.log(`Numero de Elementos:`, JSON.stringify(state.selectElementos, null))
    }




    //Selecionar Competencias
    handleChangeselectSkill = funcionarioCompetencia => {
        const state = this.state
        state.selectSkill = []

        if (funcionarioCompetencia) {
            funcionarioCompetencia.forEach((option) => {
                state.selectSkill.push(option.value)
            })
        }

        //Atualiza o Array
        this.setState(state)
        console.log(`SkillsSelecionadas`, JSON.stringify(state.selectSkill, null))
    }



    //Selecionar Interesses
    handleChangeSelectInteresse = userInteresse => {
        const state = this.state
        state.selectInteresses = []

        if (userInteresse) {
            userInteresse.forEach((option) => {
                state.selectInteresses.push(option.value)
            })
        }

        //Atualiza o Array
        this.setState(state)
        console.log(`Interesses Selecionados`, JSON.stringify(state.selectInteresses, null))
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

        //Lista de Competencias
        const skills = "http://localhost:3000/lista/skills";
        axios.get(skills)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaSkills: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + skills);
            });

        //Lista de Interesses
        const interesses = "http://localhost:3000/lista/interesses";
        axios.get(interesses)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaInteresses: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + interesses);
            });

        const equipas = "http://localhost:3000/lista/equipas";
        axios.get(equipas)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaEquipas: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + equipas);
            });
    }

    render() {

        const { selectedOption } = this.state;
        const { redirect } = this.state;
        const { id } = this.state;

        if (redirect) {
            return <Redirect to={{
                pathname: "/equipacriada/" + id
            }} />;
        }

        return (
            <div>
                <Navbar />
                <main style={{ marginBottom: 80 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Criar Equipa</h5>
                    {this.state.selectElementos != 0 && this.state.selectSkill != 0 && this.state.campNomeEquipa != "" && this.state.campNomeProjeto != "" && this.state.dataInicio != "" && this.state.dataFim != "" && this.state.campCliente != "" ?

                        <button style={{ marginTop: -35, borderRadius: 50, width: 170, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }} type="button" onClick={() => this.sendSave()} className="btn btn-primary  float-right">Gerar Equipa<ArrowForwardIosTwoToneIcon style={{ marginLeft: 10, marginRight: -10, width: 22 }} /></button>

                        : <button hidden style={{ marginTop: -35, borderRadius: 50, width: 170, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }} type="button" onClick={() => this.sendSave()} className="btn btn-primary  float-right">Gerar Equipa<ArrowForwardIosTwoToneIcon style={{ marginLeft: 10, marginRight: -10, width: 22 }} /></button>

                    }
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    <Link
                                        to={"/lista/projetos"}>{this.state.tipo === 2 || this.state.tipo === 3 ? <span>Os Meus Projetos</span> : null}
                                        {this.state.tipo === 1 ? <span>Todos os Projetos</span> : null}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Criar Equipa</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-4">
                        <div className="col-xl-6 mt-2 ">
                            <div className="card mb-4  border-0">
                                <div className="card-body mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <GroupTwoToneIcon
                                            style={{ fontSize: 35, marginRight: 15, marginTop: -3, color: '#FFA726' }} />Dados da Equipa
                                        </h5>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nome da Equipa</label>
                                        <input type="text" className="form-control" placeholder="Inserir um Nome" value={this.state.campNomeEquipa} onChange={(value) => this.setState({ campNomeEquipa: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label style={{ fontFamily: 'LightG' }} htmlFor="inputName">Nº de Elementos</label>
                                        <Select
                                            options={options}
                                            placeholder="Selecionar Número de Elementos"
                                            onChange={this.handleChangeSelectElementos}
                                            value={selectedOption} />
                                    </div>

                                </div>
                            </div>
                            <div className="card border-0 mb-3">
                                <div className="card-body mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <LayersTwoToneIcon
                                            style={{ fontSize: 35, marginRight: 15, marginTop: -3, color: '#26A69A' }} />Dados do Projeto
                                        </h5>
                                    <div className="row mt-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor="inputName">Projeto</label>
                                            <input type="text" className="form-control" placeholder="Inserir o Nome do Projeto" value={this.state.campNomeProjeto} onChange={(value) => this.setState({ campNomeProjeto: value.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor="inputName">Cliente</label>
                                            <input type="text" className="form-control" placeholder="Inserir o Cliente" value={this.state.campCliente} onChange={(value) => this.setState({ campCliente: value.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor="exampleFormControlTextarea1">Inicio do Projeto</label>
                                            <input x type="date" className="form-control" placeholder="Inserir uma Data" value={this.state.dataInicio} onChange={(value) => this.setState({ dataInicio: value.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor="exampleFormControlTextarea1">Fim do Projeto</label>
                                            <input type="date" className="form-control" placeholder="Inserir uma Data" value={this.state.dataFim} onChange={(value) => this.setState({ dataFim: value.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card mb-4 mt-2 border-0">
                                <div className="card-body mt-4 mb-3 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <AssignmentTwoToneIcon
                                            style={{ fontSize: 30, marginRight: 15, marginTop: -3, color: '#7C4DFF' }} />Descrição do Projeto
                                        </h5>
                                    <textarea style={{ fontFamily: 'LightG' }} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                                </div>
                            </div>
                            <div className="card mb-4 mt-2  border-0">
                                <div className="card-body mt-4 mb-1 ml-3 mr-3">
                                    <h5
                                        style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <WorkTwoToneIcon
                                            style={{ fontSize: 30, marginRight: 15, marginTop: -3, color: '#1976D2' }} />Skills
                                    </h5>
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={this.loadFillSkills()}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Procurar Competências"
                                        onChange={this.handleChangeselectSkill}
                                    />
                                    <ul className="mt-4">
                                        {this.loadFillSkillsSelected()}
                                    </ul>
                                </div>
                            </div>
                            <div className="card mb-4 mt-2  border-0">
                                <div className="card-body mt-4  ml-3 mr-3">
                                    <h5
                                        style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <FavoriteTwoToneIcon
                                            style={{ fontSize: 30, marginRight: 15, marginTop: -3, color: '#EF5350' }} />
                                        Interesses
                                        </h5>
                                    <Select
                                        isMulti
                                        name="colors"
                                        options={this.loadFillInteresses()}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Procurar Interesses"
                                        onChange={this.handleChangeSelectInteresse}
                                    />
                                    <ul className="mt-4">
                                        {this.loadFillInteressesSelected()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div >
        )
    }

    //Lista de Competencias
    loadFillSkills() {
        return this.state.listaSkills.map((data, index) => {
            return (
                { value: data.id, label: data.skill }
            )
        })
    }

    //Lista de Interesses
    loadFillInteresses() {
        return this.state.listaInteresses.map((data, index) => {
            return (
                { value: data.id, label: data.interesse }
            )
        })
    }

    //Mostrar as Skills Selecionadas
    loadFillSkillsSelected() {
        return this.state.listaSkills.map((data1, index1) => {
            return this.state.selectSkill.map((data, index) => {
                if (data === data1.id) {
                    return (
                        <li key={index, index1} className="list-group-item mt-1 border-0">
                            <span style={{ fontFamily: 'LightG', fontSize: 18 }}><FiberManualRecordTwoToneIcon style={{ fontSize: 15, marginRight: 10, marginTop: -2, color: '#1976D2' }} />{data1.skill}</span>
                        </li>
                    )
                }
            })
        })
    }

    //Mostrar os Interesses Selecionadas
    loadFillInteressesSelected() {
        return this.state.listaInteresses.map((data1, index1) => {
            return this.state.selectInteresses.map((data, index) => {
                if (data === data1.id) {
                    return (
                        <li key={index, index1} className="list-group-item mt-1 border-0">
                            <span style={{ fontFamily: 'LightG', fontSize: 18 }}><FiberManualRecordTwoToneIcon style={{ fontSize: 15, marginRight: 10, marginTop: -2, color: '#EF5350' }} />{data1.interesse}</span>
                        </li>
                    )
                }
            })
        })
    }

    //Guardar Informações da Equipa
    sendSave() {

        const baseURL = "http://localhost:3000/teamlead/criar/equipa"
        const datapost = {

            idTeamLead: this.state.id,
            nomeProjeto: this.state.campNomeProjeto,
            nomeEquipa: this.state.campNomeEquipa,
            inicio: this.state.dataInicio,
            fim: this.state.dataFim,
            cliente: this.state.campCliente,
            descricao: this.state.campDescricao,
            selectSkill: this.state.selectSkill,
            selectInteresses: this.state.selectInteresses,
            selectElementos: this.state.selectElementos,
        }

        console.log(datapost)

        axios.post(baseURL, datapost)
            .then(response => {

                if (response.data.success === true) {
                    console.log(response.data.data.id)
                    this.setState({ redirect: true, id: response.data.data.id })
                    //this.state.id = response.data.data.id
                }

                else { alert(response.data.message) }

                console.log(this.state.id)
            })
            .catch(error => {
                alert("Error 34" + error)
            })


    }

}
