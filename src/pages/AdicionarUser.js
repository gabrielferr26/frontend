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
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select'
import Slider from '@material-ui/core/Slider';
import Swal from 'sweetalert2'

//Importação de Icones
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import CollectionsBookmarkTwoToneIcon from '@material-ui/icons/CollectionsBookmarkTwoTone';
import LocationCityTwoToneIcon from '@material-ui/icons/LocationCityTwoTone';
import SchoolTwoToneIcon from '@material-ui/icons/SchoolTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

//Importação de Icones
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

export default class AdicionarFuncionario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Requesições de API
            listaCompetencias: [],
            listaInteresses: [],
            listaCargos: [],
            listaTipoHabilitacoes: [],
            campNome: "",
            campUsername: "",
            campPassword: "",
            campNIF: "",
            campAvatar: null,
            campEmail: "",
            campPhone: "",
            campNacionalidade: "",
            campEndereço: "",
            campInstituicao: "",
            campCurso: "",
            selectCargo: 0,
            selectCurso: 0,
            selectCompetencia: [],
            selectInteresse: [],
            habilitacoes: [],
            valueSliders: [],
            selectFile: null

        };

        this.selectChange = this.selectChange.bind(this)
        this.instituicaoChange = this.instituicaoChange.bind(this)
        this.cursoChange = this.cursoChange.bind(this)
        this.removehabilitacao = this.removehabilitacao.bind(this)

    }


    //Selecionar Cargo do Funcionário
    handleChangeSelectCargo = selectCargo => {
        const state = this.state
        state.selectCargo = ""

        if (selectCargo) {
            state.selectCargo = selectCargo.value
        }

        this.setState(state)
        console.log(`Options selected:`, JSON.stringify(state.selectCargo, null))
    }

    //Selecionar o Tipo de Curso
    handleChangeSelectCurso = selectCurso => {
        const state = this.state
        state.selectCurso = ""

        if (selectCurso) {
            state.selectCurso = selectCurso.value
        }

        this.setState(state)
        console.log(`Tipo de Habilitacao:`, JSON.stringify(state.selectCurso, null))
    }

    //Selecionar Competencia de um Funcionario
    handleChangeSelectCompetencia = evento => {
        const state = this.state
        state.selectCompetencia = []

        if (evento) {
            evento.forEach((option) => {
                state.selectCompetencia.push(option.value)
            })
        }

        //Rever o Porque de não estar a Eliminar a posição (0)
        if (this.state.selectCompetencia.splice.length) {
            this.state.valueSliders.splice(state.selectCompetencia.length, 1)
        }


        //Atualiza o Array
        this.setState(state)
        console.log(`Competencias Selecionadas`, JSON.stringify(state.selectCompetencia, null))
    }



    //Selecionar Interesse de um Funcionario
    handleChangeSelectInteresse = funcionarioInteresse => {
        const state = this.state
        state.selectInteresse = []

        if (funcionarioInteresse) {
            funcionarioInteresse.forEach((option) => {
                state.selectInteresse.push(option.value)
            })
        }

        //Atualiza o Array
        this.setState(state)
        console.log(`Interesses Selecionados:`, JSON.stringify(state.selectInteresse, null))
    }


    //Lista de Habilitacoes
    handleSubmitHabilitacoes = event => {

        if (this.state.selectCurso === 0) {
        }
        else if (this.state.campInstituicao === '') {
        }

        else if (this.state.campCurso === '') {
        }
        else {
            this.setState({
                habilitacoes: this.state.habilitacoes.concat({
                    strSelect: this.state.selectCurso,
                    strInstituicao: this.state.campInstituicao,
                    strCurso: this.state.campCurso,
                }),
                selectCurso: "",
                campInstituicao: "",
                campCurso: ""
            })
        }
    }

    changeValue(event) {
        console.log("Current Value is ", event.target.value);
    }

    selectChange(event) {
        this.setState({ selectCurso: event.target.value })
    }
    instituicaoChange(event) {
        this.setState({ campInstituicao: event.target.value })
    }
    cursoChange(event) {
        this.setState({ campCurso: event.target.value })
    }

    removehabilitacao(event, i) {
        let habilitacoes = this.state.habilitacoes.slice()
        habilitacoes.splice(i, 1)
        this.setState({
            habilitacoes
        })
    }

    //Selecionar Nivel das Competencias
    handleSlider(event, value, index) {
        let values = [...this.state.valueSliders];
        values[index] = value;
        this.setState({ valueSliders: values });
        console.log('Slider' + value + index);
    }

    //Selecionar Imagem
    onChangeFile = event => {
        this.setState({
            selectFile: event.target.files[0]
        })

        console.log(event.target.files[0])

    }

    submitteste() {
        console.log(this.state)
    }

    cleanCampos() {
        this.setState({
            campNome: "",
            campUsername: "",
            campPassword: "",
            campNIF: "",
            campAvatar: null,
            campEmail: "",
            campPhone: "",
            campNacionalidade: "",
            campEndereço: "",
            campInstituicao: "",
            campCurso: "",
            selectCargo: 0,
            selectCurso: 0,
            selectCompetencia: [],
            selectInteresse: [],
            habilitacoes: [],
            valueSliders: [],
        })
    }

    componentDidMount() {

        //Lista de Cargos
        const cargos = "https://glacial-stream-93235.herokuapp.com/lista/cargos";
        axios.get(cargos)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaCargos: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + cargos);
            });


        //Lista de Competencias
        const competencias = "https://glacial-stream-93235.herokuapp.com/lista/skills";
        axios.get(competencias)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaCompetencias: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + competencias);
            });

        //Lista de Interesses
        const interesses = "https://glacial-stream-93235.herokuapp.com/lista/interesses";
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

        //Tipo de Habilitacao
        const habilitacoes = "https://glacial-stream-93235.herokuapp.com/lista/cursos";
        axios.get(habilitacoes)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaTipoHabilitacoes: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + habilitacoes);
            });
    }


    render() {

        //Props e Estados
        const { selectedOption } = this.state;

        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Adicionar Funcionário</h5>
                    <Button
                        style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none' }}
                        type="button"
                        onClick={() => this.sendSave()}
                        className="btn btn-primary float-right">
                        Adicionar
                        </Button>
                    <Button
                        style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 10, backgroundColor: '#607d8b', border: 'none' }}
                        type="button"
                        onClick={() => this.cleanCampos()}
                        className="btn btn-primary float-right">
                        Limpar
                    </Button>
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Adicionar Funcionário</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-4">
                        <div className="col-xl-4 mt-2">
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-4 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}><AccountCircleTwoToneIcon style={{ fontSize: 35, marginRight: 15, marginTop: -3, color: '#1976d2' }} />Dados do Funcionário</h5>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nome:</label>
                                        <input type="name" className="form-control" placeholder="Inserir um Nome " value={this.state.campNome}
                                            onChange={(value) => this.setState({ campNome: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Email:</label>
                                        <input type="name" className="form-control" placeholder="Inserir um E-mail" value={this.state.campEmail}
                                            onChange={(value) => this.setState({ campEmail: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Password:</label>
                                        <input type="password" className="form-control" id="inputPassword3" placeholder="Inserir uma Palavra Passe" value={this.state.campPassword}
                                            onChange={(value) => this.setState({ campPassword: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Número Contribuinte:</label>
                                        <input type="name" className="form-control" placeholder="Inserir um Número de Contribuinte" value={this.state.campNIF}
                                            onChange={(value) => this.setState({ campNIF: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName"> Função:</label>
                                        <Select
                                            placeholder="Escolher Função"
                                            onChange={this.handleChangeSelectCargo}
                                            value={selectedOption}
                                            options={this.loadFillCargos()} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Nacionalidade:</label>
                                        <input type="name" className="form-control" placeholder="Inserir uma Nacionalidade" value={this.state.campNacionalidade}
                                            onChange={(value) => this.setState({ campNacionalidade: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Localidade:</label>
                                        <input type="name" className="form-control" placeholder="Inserir uma Localidade" value={this.state.campEndereço}
                                            onChange={(value) => this.setState({ campEndereço: value.target.value })} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Contacto:</label>
                                        <input type="name" className="form-control" placeholder="Inserir um Número de Telemóvel" value={this.state.campPhone}
                                            onChange={(value) => this.setState({ campPhone: value.target.value })} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-4 mt-2">
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4  ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <SchoolTwoToneIcon
                                            style={{ fontSize: 35, marginRight: 15, marginTop: -3, color: '#ffb74d' }} />
                                        Habilitações Académicas</h5>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Tipo de Habilitação:</label>
                                        <Select
                                            placeholder="Escolher um Tipo de Curso"
                                            onChange={this.handleChangeSelectCurso}
                                            value={selectedOption}
                                            options={this.loadFillTipoHabiitacao()} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Instituição:</label>
                                        <input type="name" className="form-control" value={this.state.campInstituicao} placeholder="Inserir Nome da Instituição" onChange={this.instituicaoChange} />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="inputName">Curso:</label>
                                        <input type="name" className="form-control" value={this.state.campCurso} placeholder="Inserir Nome do Curso" onChange={this.cursoChange} />
                                    </div>
                                    <div className="mt-4">
                                        <IconButton onClick={this.handleSubmitHabilitacoes} style={{ color: '#1976d2', marginLeft: -10 }}>
                                            <AddCircleOutlineTwoToneIcon />
                                        </IconButton><span style={{ fontFamily: 'LightG' }}>Adicionar Habilitação</span>
                                    </div>
                                    <ul className="list-group list-group-flush mt-4">
                                        {this.loadFillHabilitacoes()}
                                    </ul>
                                </Card.Body>
                            </Card>
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-3 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <FavoriteTwoToneIcon
                                            style={{ fontSize: 32, marginRight: 15, marginTop: -3, color: '#ef5350' }} />
                                        Interesses
                                    </h5>
                                    <div className="mt-3">
                                        <Select
                                            isMulti
                                            name="colors"
                                            options={this.loadFillInteresses()}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Procurar Interesses"
                                            onChange={this.handleChangeSelectInteresse}
                                        />
                                    </div>
                                    <ul className="list-group list-group-flush mt-4">
                                        {this.loadFillInteressesFuncionario()}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-4 mt-2">
                            <Card className="mb-4  border-0">
                                <Card.Body className="mt-4 mb-3 ml-3 mr-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginBottom: 20 }}>
                                        <WorkTwoToneIcon
                                            style={{ fontSize: 32, marginRight: 15, marginTop: -3, color: '#1976d2' }} />
                                        Skills
                                    </h5>
                                    <div className="mt-3">
                                        <Select
                                            isMulti
                                            name="colors"
                                            options={this.loadFillCompetencias()}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Procurar Skills"
                                            onChange={this.handleChangeSelectCompetencia}
                                        />
                                    </div>
                                    <ul className="list-group list-group-flush mt-4">
                                        {this.loadFillCompetenciasFuncionario()}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </main>
            </div >
        )
    }

    //Lista de Cargos
    loadFillCargos() {
        return this.state.listaCargos.map((data, index) => {
            return (
                { value: data.id, label: data.cargo }
            )
        })
    }

    //Lista de Competencias
    loadFillCompetencias() {
        return this.state.listaCompetencias.map((data, index) => {
            return (
                { value: data.id, label: data.skill }
            )
        })
    }

    //Lista de Competencias
    loadFillInteresses() {
        return this.state.listaInteresses.map((data, index) => {
            return (
                { value: data.id, label: data.interesse }
            )
        })
    }

    //Lista de Tipo de Habiltiacoes
    loadFillTipoHabiitacao() {
        return this.state.listaTipoHabilitacoes.map((data, index) => {
            return (
                { value: data.id, label: data.curso }
            )
        })
    }


    //Nova Lista de Habilitiacoes
    loadFillHabilitacoes() {
        return this.state.habilitacoes.map((item, index) => {
            const { strInstituicao, strCurso } = item
            return (
                <li key={index} className="list-group-item mt-1 border-0">
                    <div>
                        <LocationCityTwoToneIcon
                            style={{ color: '#1976d2' }} />
                        <span style={{ fontFamily: 'BoldG' }} className="ml-3">{strInstituicao}</span>
                    </div>
                    <div
                        className="mt-2">
                        <SchoolTwoToneIcon
                            style={{ color: '#F29118' }} />
                        <span style={{ fontFamily: 'LightG' }} className="ml-3">{strCurso}</span>
                    </div>
                    <IconButton
                        style={{ float: 'right', marginTop: -62, marginRight: -20 }}
                        onClick={this.removehabilitacao}>
                        <DeleteSweepTwoToneIcon
                            style={{ color: '#ef5350', fontSize: 28 }} />
                    </IconButton>
                </li>
            )
        })
    }


    //Nova Lista de Skills de um Funcionario
    loadFillCompetenciasFuncionario() {
        return this.state.listaCompetencias.map((data1, index1) => {
            return this.state.selectCompetencia.map((data, index) => {
                if (data === data1.id) {
                    return (
                        <li key={index, index1} className="list-group-item mt-1 border-0">
                            <div><CollectionsBookmarkTwoToneIcon style={{ color: '#1976d2' }} /><span className="ml-3">{data1.skill}</span></div>
                            <Slider min={0} max={100} step={10} onChange={(event, value) => this.handleSlider(event, value, index)} />
                        </li>
                    )
                }
            })
        })
    }


    //Nova Lista de Interesses de um Funcionario
    loadFillInteressesFuncionario() {
        return this.state.listaInteresses.map((data1, index1) => {
            return this.state.selectInteresse.map((data, index) => {
                if (data === data1.id) {
                    return (
                        <li key={index, index1} className="list-group-item mt-1 border-0">
                            <div><FavoriteTwoToneIcon style={{ color: '#ef5350' }} /><span className="ml-3">{data1.interesse}</span></div>
                        </li>

                    )
                }
            })
        })
    }


    //Guardar Informações
    sendSave(e) {
        if (this.state.selectCargo === 0) {
            Toast.fire({
                icon: 'warning',
                title: 'Preencher Campos Obrigatórios',
            })
        }

        else {


            const baseURL = "https://glacial-stream-93235.herokuapp.com/admin/adicionar/user"
            /*const formData = new FormData();
            formData.append("file", this.state.selectFile);*/

            const datapost = {
                name: this.state.campNome,
                password: this.state.campPassword,
                nif: this.state.campNIF,
                email: this.state.campEmail,
                phone: this.state.campPhone,
                nacionality: this.state.campNacionalidade,
                address: this.state.campEndereço,
                cargo: this.state.selectCargo,
                interesseId: this.state.selectInteresse,
                competenciaId: this.state.selectCompetencia,
                habilitacoes: this.state.habilitacoes,
                valueSliders: this.state.valueSliders
            }
            console.log(datapost)
            axios.post(baseURL, datapost)
                .then(response => {

                    if (response.data.success === true) {
                        alert(response.data.message)
                    }
                    else {
                        alert(response.data.message)
                    }

                }).catch(error => {
                    alert("Error 34" + error)
                })
        }
    }



}