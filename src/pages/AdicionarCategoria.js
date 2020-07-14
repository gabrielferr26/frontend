import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import axios from 'axios'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

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

export default class AdicionarCategoria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campCategoria: "",

        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Adicionar Categoria</h5>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to={"/adicionar/skill"}>Adicionar Skill</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Adicionar Categoria</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-6">
                        <form >
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputName">Nome</label>
                                    <input type="name" className="form-control" placeholder="Introduzir Categoria" value={this.state.campCategoria}
                                        onChange={(value) => this.setState({
                                            campCategoria: value.target.value
                                        })} />
                                </div>
                            </div>
                            <button style={{ borderRadius: 55, width: 140, height: 45 }} type="submit" className="btn btn-primary mt-3  float-right"
                                onClick={() => this.onSave()}> Adicionar </button>
                            <Link to={"/adicionar/competencia"}><button style={{ borderRadius: 55, width: 140, height: 45 }} type="submit" className="btn mr-3 mt-3 btn-outline-danger  float-right"> Cancelar</button></Link>
                        </form>
                    </div>
                </main>
            </div>
        )
    }


    onSave() {

        if (this.state.campCategoria === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Preencher Campos Obrigatórios'
            })
        }

        else {
            Toast.fire({
                icon: 'success',
                title: 'A Categoria ' + this.state.campCategoria + ' foi adicionada'

            })
            const baseURL = "http://localhost:3000/adicionar/categoria"
            const datapost = {
                categoria: this.state.campCategoria
            }

            axios.post(baseURL, datapost)
                .then(response => {
                    if (response.data.success === true) {

                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34" + console.error)
                })
        }
    }
}