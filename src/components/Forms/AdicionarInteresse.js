import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

//Importação de Componentes

export default class FormInteresse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campInteresse: "",
        }
    }
    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Nome</label>
                        <input type="name" className="form-control" placeholder="Introduzir nome do interesse" value={this.state.campInteresse} onChange={(value) => this.setState({ campInteresse: value.target.value })} />
                    </div>
                </div>
                <button onClick={() => this.sendSave()} type="button" className="btn btn-primary">{this.props.btnName}</button>
            </form>
        )
    }

    sendSave() {
        if (this.state.campInteresse === "") {
            alert("Insira o Nome de um Interesse")
        }

        else {
            const baseURL = "http://localhost:3000/adicionar/interesse"
            const datapost = {
                interesse: this.state.campInteresse,
            }

            axios.post(baseURL, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
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