import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes
import { Card } from 'react-bootstrap'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';

//Importação de Icones
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';


const baseURL = "http://localhost:3000"

export default class ListaProjetosTeamLead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nome: "",
            avatarURL: "",
            tipo: "",
            contagemUser: "",
            listaProjetos: [],
        };
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

        //Lista de Projetos de um Dado Utilizador
        const projetos = "http://localhost:3000/lista/projetos";
        axios.get(projetos)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaProjetos: data });
                    console.log(this.state.lista)
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + projetos);
            });

    }


    render() {
        return (
            <React.Fragment>
                <Card style={{ border: 'none' }} className="mt-3">
                    <Card.Body className="mt-2">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={"/lista/allprojetos"}>
                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2 ml-4 mb-4">{this.props.titulo}</h5>
                        </Link>
                        <ul className="list-group list-group-flush ">
                            {this.loadFillProjetos()}
                        </ul>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }

    //Projetos de um Team Lead
    loadFillProjetos() {
        return this.state.listaProjetos.slice(0, 6).map((data, index) => {
            if (data.projeto.estado === false) {
                return (
                    <li key={index} style={{ marginTop: -10 }} className="list-group-item border-0">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={"/projeto/" + data.projeto.id}>
                            <div>
                                <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>{data.projeto.nome}</span>
                                <div>
                                    <span style={{ fontFamily: 'RegularG', fontSize: 16 }}>{data.projeto.cliente}</span>
                                </div>
                            </div>
                        </Link>
                        <div style={{ marginTop: -55, marginBottom: 5 }} className="d-flex justify-content-end">
                            <AvatarGroup style={{ marginTop: 10 }} max={4}>
                                {this.loadFillUsers(data.projeto.id)}
                            </AvatarGroup>
                        </div>
                    </li>
                )
            }
        })
    }

    loadFillUsers(aux) {
        return this.state.listaProjetos.map((data, index) => {
            if (data.projetoId === aux) {
                return data.users.map((data1, index1) => {
                    return (
                        <Avatar key={index1} alt={data1.nome} src={data1.avatarURL} />
                    )
                })
            }
        })
    }
}