import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

//Importação de Componenetes
import Navbar from '../components/Navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Button } from 'react-bootstrap';
export default class AdicionarHabilitação extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campHabilitacao: "",
            listaTipoHabilitacoes: []

        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Adicionar Tipo de Habilitação</h5>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/adashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active">Adicionar Tipo de Habilitação</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-6">
                        <form >
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputName">Nome</label>
                                    <input type="name" className="form-control" placeholder="Introduzir Habilitação" value={this.state.campHabilitacao}
                                        onChange={(value) => this.setState({
                                            campHabilitacao: value.target.value
                                        })} />
                                </div>
                            </div>
                            <Link to={"/dashboard"}>
                                <Button
                                    style={{ borderRadius: 55, width: 140, height: 45 }}
                                    type="submit"
                                    className="btn btn-primary mt-3  float-right"
                                    onClick={() => this.onSave()}> Adicionar
                            </Button>
                            </Link>
                            <Link
                                to={"/dashboard"}>
                                <Button variant="outline-danger"
                                    style={{ borderRadius: 55, width: 140, height: 45 }}
                                    type="submit"
                                    className="btn mr-3 mt-3   float-right"> Cancelar
                                </Button>
                            </Link>
                        </form>
                    </div>

                </main>
            </div>
        )
    }

    //Lista de Tipo de Habilitacoes

    onSave() {
        const baseURL = "http://localhost:3000/admin/adicionar/tipohabilitacao"
        const datapost = {
            curso: this.state.campHabilitacao
        }

        axios.post(baseURL, datapost)
            .then(response => {
                if (response.data.success === true) {
                    Swal.fire(
                        'Adicionado!',
                        'O Tipo de Habilitação' + this.state.campHabilitacao + ' foi Adicionado!',
                        'success'
                    )

                }
                else {
                    Swal.fire(
                        'Ocorreu um Problema! ',
                        'Tente de Novo!',
                        'error'
                    )
                }
            }).catch(error => {
                alert("Error 34" + console.error)
            })

        console.log(this.state.campHabilitacao)
    }

}