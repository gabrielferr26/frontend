import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import '../style.css'
import AuthService from '../pages/Auth.Service'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'


//Importação de Componentes

import Background from '../assets/images/fundo.png'
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import Swal from 'sweetalert2'

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

const required = value => {
    if (!value) {
        Toast.fire({
            icon: 'warning',
            title: 'Preencher Campos Obrigatórios',
        })
    }
}

export default class Login extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            campEmail: "",
            campPassword: "",
            loading: false,
            message: "",
            id: "",
            nome: "",
            tipo: "",
            avatarURL: ""
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    onChangeEmail(event) {
        this.setState({ campEmail: event.target.value })
    }

    onChangePassword(event) {
        this.setState({ campPassword: event.target.value })
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

    handleLogin(e) {
        e.preventDefault()
        this.setState({ message: "", loading: true })
        this.form.validateAll()

        if (this.checkButton.context._errors.length === 0) {
            AuthService.login(this.state.campEmail, this.state.campPassword).then(
                () => {
                   
                    this.props.history.push("/dashboard/")
                }
            )

            this.setState({
                loading: false,
                message: "Estes campos não existem"
            })
        }
    }

    render() {
        return (
            <div >
                <div>
                    <nav className="navbar navbar-light ">
                        <a className="navbar-brand mt-2 mb-2" href="#">
                            <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
                            <span style={{ fontFamily: 'BoldG', fontSize: 26 }}>Bizdirect<span style={{ marginLeft: 10, fontFamily: 'LightG' }}>by Teams</span></span>
                        </a>
                        <div>
                            <span className="navbar-text mr-5 mt-2 mb-2 d-none ">
                                Contacte o Departamento de Recursos Humanos
                        </span>
                            <a href="https://www.bizdirect.pt/pt/?utm_source=Google%20Ads&utm_medium=Search-PPC&utm_campaign=MARCA%20-%20Bizdirect&gclid=CjwKCAjw88v3BRBFEiwApwLevZJvIOxErgau5Nfavl1dvksyI4VMOqA5mTP961an3ctYkCdFY4qzhxoCCtQQAvD_BwE"><button style={{ borderRadius: 55, width: 140, height: 42, border: 'none' }} type="button" className="btn btn-primary mr-3 mt-2  float-right mb-2"><span className="mb-3">Descobrir </span><ArrowForwardIosTwoToneIcon style={{ fontSize: 15 }} /></button></a>
                        </div>
                    </nav>
                </div>
                <main style={{ marginLeft: 10, marginRight: 10 }}>
                    <div className="row">
                        <div className="col-xl-8 col-md-8  d-inline-block " style={{ backgroundImage: `url(${Background})` }}></div>
                        <div className="col-xl-4 col-md-12 col-sm-12 mh-100">
                            <div style={{ marginTop: 180, marginLeft: 55 }}>
                                <Form onSubmit={this.handleLogin} ref={c => { this.form = c }} className="col-11">
                                    <h1 className="mb-4" style={{ fontFamily: 'BoldG', color: 'black' }}>Bem-Vindo</h1>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">E-mail</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="campEmail" value={this.state.campEmail} onChange={this.onChangeEmail} validations={[required]} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" name="campPassword" value={this.state.campPassword} onChange={this.onChangePassword} validations={[required]} />
                                    </div>
                                    <small id="emailHelp" className="form-text text-muted float-right">Não partilhe os seus dados com ningúem</small>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Lembrar-me</label>
                                    </div>
                                    <CheckButton ref={c => { this.checkButton = c; }} style={{ borderRadius: 55, fontFamily: 'RegularG', height: 42, marginBottom: 350 }} className="btn btn-primary col-12">Login</CheckButton>
                                </Form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }


}