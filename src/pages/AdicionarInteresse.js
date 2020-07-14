import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//Importação de Componenetes
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap'

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

export default class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campInteresse: "",
            listaInteresses: []
        }
    }

    componentDidMount() {

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
    }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Adicionar Interesse</h5>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/admin/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Adicionar Interesse</li>
                            </ol>
                        </nav>
                    </div>
                    <form className="col-xl-6">
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputName">Nome</label>
                                <input type="name" className="form-control" placeholder="Introduzir Interesse"
                                    value={this.state.campInteresse}
                                    onChange={(value) => this.setState({
                                        campInteresse: value.target.value
                                    })} />
                            </div>
                        </div>
                        <Link to={"/lista/interesses"}>
                            <Button
                                style={{ borderRadius: 55, width: 140, height: 45 }}
                                type="submit"
                                className="btn btn-primary mt-3  float-right"
                                onClick={() => this.sendSave()}> Adicionar
                        </Button>
                        </Link>
                        <Link
                            to={"/lista/interesses"}>
                            <Button
                                variant="outline-danger"
                                style={{ borderRadius: 55, width: 140, height: 45 }}
                                type="submit"
                                className="mt-3 mr-3 float-right"> Cancelar
                            </Button>
                        </Link>

                    </form>
                </main>
            </div>
        )
    }

    sendSave() {

        var igual = []

        const baseURL = "https://glacial-stream-93235.herokuapp.com/admin/adicionar/interesse"
        const datapost = {
            interesse: this.state.campInteresse,
        }

        this.state.listaInteresses.map((data, index) => {
            igual = data.interesse
        })

        console.log(igual)

        if (this.state.campInteresse != igual) {
            axios.post(baseURL, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'O Interesse ' + this.state.campInteresse + ' foi Adicionado!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }
                    else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34" + console.error)
                })

        }

        if (this.state.campInteresse === igual) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'O Interesse ' + this.state.campInteresse + ' já Existe!',
                showConfirmButton: false,
                timer: 1500
            })

        }

    }

}