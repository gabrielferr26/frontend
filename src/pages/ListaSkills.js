import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import '../style.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';


//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import { Button } from 'react-bootstrap';


export default class ListaCompetencias extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaCompetencias: [],
        };
    }

    componentDidMount() {

        //Lista de Funcionarios
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
    }


    render() {
        return (
            <div>
                <Navbar />
                <main style={{ marginRight: 60 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Lista de Skills</h5>
                    <Link
                        to="/adicionar/skill">
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 15, backgroundColor: '#1976d2', border: 'none' }}
                            type="button"
                            className="btn btn-primary  float-right">Adicionar
                        </Button>
                    </Link>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/dashboard"}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page">Lista de Comptências
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-12 mr-4 ">
                        <table className="table table-borderless table-hover ml-1 mt-4" >
                            <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {this.loadFillCompetencias()}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        )
    }


    //Lista de Competencias
    loadFillCompetencias() {
        return this.state.listaCompetencias.map((data, index) => {
            return (
                <tr key={index}>
                    <td
                        style={{ fontFamily: 'BoldG' }}
                        className="align-middle d-flex justify-content-left">
                        <span className="ml-1 mt-3 mb-3">
                            <span>
                                <WorkTwoToneIcon
                                    style={{ marginRight: 15, marginTop: 0.5, color: '#1976d2' }} />
                            </span>{data.skill}
                        </span>
                    </td>
                    <td
                        style={{ fontFamily: 'LightG' }}
                        className="align-middle">
                        <span>
                            {data.categoria.categoria}
                        </span>
                    </td>
                    <td
                        className="align-middle d-flex justify-content-end">
                        <Link
                            to={"/skill/" + data.id}>
                            <IconButton>
                                <ArrowForwardIosTwoToneIcon
                                    style={{ fontSize: 18 }} />
                            </IconButton>
                        </Link>
                    </td>
                </tr >
            )
        })
    }
}