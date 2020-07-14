import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

//Importação de Componenetes
import Navbar from '../components/Navbar/Navbar'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import { Button } from 'react-bootstrap';


export default class ListaInteresses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaInteresses: [],
        };
    }

    componentDidMount() {

        //Lista de Interesses
        const interesses = "http://localhost:3000/lista/interesses";
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
                <main style={{ marginRight: 60 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Lista de Interesses</h5>
                    <Link
                        to="/adicionar/interesse">
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 150, height: 52, marginRight: 15, backgroundColor: '#1976d2', border: 'none' }}
                            type="button"
                            className="btn btn-primary float-right">
                            Adicionar
                            </Button>
                    </Link>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link
                                        to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Lista de Interesses</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-12 mr-4 ">
                        <table className="table table-borderless table-hover ml-1 mt-4" >
                            <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {this.loadFillInteresses()}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        )
    }

    loadFillInteresses() {
        return this.state.listaInteresses.map((data, index) => {
            return (
                <tr key={index}>
                    <td style={{ fontFamily: 'BoldG' }} className="align-middle d-flex justify-content-left"><span className="ml-1 mt-3 mb-3">
                        <span><FavoriteTwoToneIcon style={{ marginRight: 15, marginTop: 0.5, color: '#ef5350' }} /></span>{data.interesse}</span></td>
                    <td style={{ fontFamily: 'RegularG' }} className="align-middle">
                        <span></span>
                    </td>
                    <td className="align-middle d-flex justify-content-end">
                        <Link to={"/interesse/" + data.id}>
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