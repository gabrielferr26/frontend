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
import Select from 'react-select'
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";

//Importação de Icones
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

const baseURL = "http://localhost:3000"

export default class EditarSkills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSkill: [],
            skill: "",
            categoria: "",
            listaCategorias: []


        }
    }

    handleChangeSelectCategoria = selectCategoria => {
        const state = this.state
        state.selectCategoria = ""

        if (selectCategoria) {
            state.selectCategoria = selectCategoria.value
        }

        this.setState(state)
        console.log(`Options selected:`, JSON.stringify(state.selectCategoria, null))
    }


    componentDidMount() {

        //Dados da Skill
        let skillId = this.props.match.params.id;
        const url1 = "http://localhost:3000/info/skill/" + skillId;
        axios.get(url1)
            .then(res => {
                if (res.data.success) {
                    const data = res.data
                    this.setState({
                        dataSkill: data,
                        skill: data.data.skill,
                        categoria: data.data.categoriaId
                    })

                    console.log(this.state.skill)

                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("Error Server " + error)
            })

        const url = "http://localhost:3000/lista/categorias";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaCategorias: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + url);
            });






    }

    render() {

        const { selectedOption } = this.state;

        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Editar Skill</h5>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to={"/lista/skills"}>Skills</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Editar Skill</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-5">
                        <div className="col-xl-6">
                            <form >
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputName">Nome</label>
                                        <input type="name" className="form-control" placeholder="Introduzir uma Skill"
                                            value={this.state.skill}
                                            onChange={(value) => this.setState({
                                                campSkill: value.target.value
                                            })} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="">Categoria</label>
                                        <Select onChange={this.handleChangeSelectCategoria} value={selectedOption} options={this.loadFillCategorias()} placeholder="Escolher Categoria" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <Link to={"/adicionar/categoria"}>
                                        <IconButton
                                            style={{ marginLeft: -12, marginTop: -3 }} >
                                            <AddCircleOutlineTwoToneIcon
                                                style={{ color: '#1976d2', }} />
                                        </IconButton>
                                        <span
                                            style={{ fontFamily: 'RegularG', fontSize: 16, marginLeft: 1, textDecoration: 'none' }}>
                                            Adicionar uma Categoria
                                        </span>
                                    </Link>
                                </div>
                                <Link to={"/lista/skills"}>
                                    <Button
                                        style={{ borderRadius: 55, width: 140, height: 45 }}
                                        type="submit"
                                        className="btn btn-primary  float-right"
                                        onClick={() => this.onSave()}> Adicionar
                                    </Button>
                                </Link>
                                <Link
                                    to={"/lista/skills"}>
                                    <Button
                                        variant="outline-danger"
                                        style={{ borderRadius: 55, width: 140, height: 45 }}
                                        type="submit"
                                        className="btn  mb-4 mr-3 float-right"> Cancelar
                                    </Button>
                                </Link>
                            </form>
                        </div>
                    </div>

                </main>

            </div>
        )
    }

    loadFillCategorias() {
        return this.state.listaCategorias.map((data, index) => {
            return (
                { value: data.id, label: data.categoria }
            )
        })
    }

    onSave() {

        var igual = []

        this.state.listaSkills.map((data, index) => {
            igual = data.skill
        })

        const baseURL = "http://localhost:3000/admin/update/skill"
        const datapost = {
            competencia: this.state.campCompetencia,
            categoria: this.state.selectCategoria
        }

        if (this.state.campCompetencia != igual) {
            axios.post(baseURL, datapost)
                .then(response => {
                    if (response.data.success) {
                        Swal.fire(
                            'Adicionado!',
                            'A Skill ' + this.state.campCompetencia + ' foi Alterada!',
                            'success'
                        )
                    }
                })
                .catch(error => {
                    alert("Error 34" + console.error)
                })
        }

        if (this.state.campCompetencia === igual) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'A Skill ' + this.state.campCompetencia + ' já Existe!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}




