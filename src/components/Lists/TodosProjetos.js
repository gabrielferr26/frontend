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


const baseURL = "https://glacial-stream-93235.herokuapp.com"

export default class ListaProjetosTeamLead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemUser: "",
            listaProjetos: [],
        };
    }

    componentDidMount() {

        //Lista de Projetos de um Dado Utilizador
        const projetos = "https://glacial-stream-93235.herokuapp.com/lista/projetos";
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
                    <Card.Body className="mt-2 ml-4">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={"/lista/allprojetos"}>
                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2 mb-4">{this.props.titulo}</h5>
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
        return this.state.listaProjetos.slice(0, 5).map((data, index) => {
            return (
                <li key={index} style={{ marginTop: -10, marginLeft: -20 }} className="list-group-item border-0">
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={"/projeto/" + data.projeto.id}>
                        <div>
                            <span style={{ fontFamily: 'RegularG', fontSize: 16 }}>{data.projeto.nome}</span>
                            <div>
                                <span style={{ fontFamily: 'LightG', fontSize: 16, color:'#1976d2' }}>{data.projeto.cliente}</span>
                            </div>
                        </div>
                    </Link>
                    <div style={{ marginTop: -55, marginBottom: 5 }} className="d-flex justify-content-end">
                        <AvatarGroup style={{ marginTop: 10 }} max={3}>
                            {this.loadFillUsers(data.projeto.id)}
                        </AvatarGroup>
                    </div>

                </li>
            )
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