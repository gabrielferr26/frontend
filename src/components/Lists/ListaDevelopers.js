import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes
import Avatar from '@material-ui/core/Avatar';
import { Card } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';

//Importação de Icones
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';


export default class ListaDevelopers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaDevelopers: []
        };
    }

    componentDidMount() {

        //Lista de Developers
        const developers = "https://glacial-stream-93235.herokuapp.com/lista/developers";
        axios.get(developers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaDevelopers: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + developers);
            });
    }


    render() {
        return (
            <React.Fragment>
                <div className="col-xl-3 col-lg-12 col-md-12 mb-3 mt-3">
                    <Card style={{ border: 'none' }} >
                        <Card.Body className="ml-3 mr-3 mt-2 mb-2">
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={"/lista/developers"}>
                                <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-3 ml-3 mb-3">Developers</h5>
                            </Link>
                            <ul className="list-group list-group-flush ">
                                {this.loadFillDevelopers()}
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment>
        )
    }

    loadFillDevelopers() {
        return this.state.listaDevelopers.slice(0, 5).map((data, index) => {
            return (
                <React.Fragment key={index}>
                    <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to={"/user/" + data.id}>
                        <li
                            className="list-group-item border-0 ">
                            <div className="d-flex justify-content-left">
                                <Avatar style={{ width: 35, height: 35, marginTop: 3 }}
                                    alt={data.nome}
                                    src={data.avatarURL} />
                                <span style={{ marginTop: 8, marginLeft: 15, fontFamily: 'RegularG', fontSize: 16 }}>{data.nome}</span>
                            </div>
                            <div className="float-right">
                                <IconButton style={{ marginTop: -65 }}><ArrowForwardIosTwoToneIcon style={{ fontSize: 20 }} /></IconButton>
                            </div>
                        </li>
                    </Link>
                </React.Fragment>
            )
        })
    }
}