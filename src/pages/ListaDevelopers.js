import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


//Importação de Compoentes
import Navbar from '../components/Navbar/Navbar'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'




//Importação de Icones
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { Button } from 'react-bootstrap';


export default class ListaDeveloper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaDevelopers: [],
            id: "",
            nome: "",
            tipo: "",
            avatarURL: ""
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
            <div>
                <Navbar />
                <main style={{ marginBottom: 100, marginRight: 70 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Developers</h5>
                    {this.state.tipo === 1 ? <Link
                        to="/adicionar/funcionario">
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 15, backgroundColor: '#1976d2', border: 'none' }}
                            type="button"
                            className="btn btn-primary  float-right">
                            Adicionar
                        </Button>
                    </Link> : null}
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Lista de Developers</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-12 mr-4 ">
                        <table className="table table-borderless table-hover ml-1 mt-4" >
                            <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {this.loadFillDevelopers()}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        )
    }

    loadFillDevelopers() {
        return this.state.listaDevelopers.map((data, index) => {
            if (data.estado == true) {
                return (
                    <tr key={index}>
                        <td className="align-middle d-flex justify-content-left"><Avatar style={{ width: 35, height: 35, marginTop: 10 }} alt={data.name} src={data.avatarURL} /><span className="ml-4 mt-3">{data.nome}</span></td>
                        <td className="align-middle"><a className="text-decoration-none" href={`mailto:${data.email}`}><DraftsTwoToneIcon style={{ marginRight: 15 }} />{data.email}</a></td>
                        <td style={{ fontFamily: 'RegularG' }} className="align-middle"><span><FiberManualRecordTwoToneIcon style={{ color: '#43a047', fontSize: '14', marginRight: 10 }} />Disponivel</span></td>
                        <td className="align-middle d-flex justify-content-end">
                            <Link to={"/user/" + data.id}><IconButton style={{ marginTop: -32 }}><ArrowForwardIosTwoToneIcon style={{ fontSize: 18 }} /></IconButton> </Link>
                        </td>
                    </tr >
                )
            }
            else if (data.estado == null || data.estado == false) {
                return (
                    <tr key={index}>
                        <td className="align-middle d-flex justify-content-left"><Avatar style={{ width: 35, height: 35, marginTop: 10 }} alt={data.name} src={data.avatarURL} /><span className="ml-4 mt-3">{data.nome}</span></td>
                        <td className="align-middle"><a className="text-decoration-none" href={`mailto:${data.email}`}><DraftsTwoToneIcon style={{ marginRight: 15 }} />{data.email}</a></td>
                        <td style={{ fontFamily: 'RegularG' }} className="align-middle"><span><FiberManualRecordTwoToneIcon style={{ color: '#ef5350', fontSize: '14', marginRight: 10 }} />Indisponivel</span></td>
                        <td className="align-middle d-flex justify-content-end">
                            <Link to={"/user/" + data.id}><IconButton style={{ marginTop: -32 }}><ArrowForwardIosTwoToneIcon style={{ fontSize: 18 }} /></IconButton> </Link>
                        </td>
                    </tr >
                )
            }
        })
    }

}
