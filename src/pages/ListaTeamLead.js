import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'


//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'

//Importação de Icones
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { Button } from 'react-bootstrap';

export default class ListaCargos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            listaTeamLead: [],

        };
    }

    componentDidMount() {

        //Lista de Team Leads
        const teamlead = "https://glacial-stream-93235.herokuapp.com/lista/teamlead";
        axios.get(teamlead)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaTeamLead: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + teamlead);
            });
    }


    render() {
        return (
            <div>
                <Navbar />
                <main style={{ marginBottom: 100, marginRight: 70 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Team Leads</h5>
                    <Link
                        to="/adicionar/funcionario">
                        <Button
                            style={{ marginTop: -35, borderRadius: 50, width: 140, height: 52, marginRight: 15, backgroundColor: '#1976d2', border: 'none' }}
                            type="button"
                            className="btn btn-primary  float-right">
                            Adicionar
                            </Button>
                    </Link>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/dashboard"}>Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Lista de Team Leads</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-xl-12 mr-4 ">
                        <table className="table table-borderless table-hover ml-1" >
                            <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {this.loadFillTeamLead()}
                            </tbody>
                        </table>
                    </div>

                </main>

            </div>
        )
    }

    loadFillTeamLead() {
        return this.state.listaTeamLead.map((data, index) => {
            if (data.estado == true) {
                return (
                    <tr key={index}>
                        <td className="align-middle d-flex justify-content-left"><Avatar style={{ width: 35, height: 35, marginTop: 13 }} alt={data.name} src={data.avatarURL} /><span style={{ marginTop: 18 }} className="ml-4">{data.nome}</span></td>
                        <td className="align-middle"><a className="text-decoration-none" href={`mailto:${data.email}`}><DraftsTwoToneIcon style={{ marginRight: 15 }} />{data.email}</a></td>
                        <td className="align-middle"><FiberManualRecordTwoToneIcon style={{ color: '#43a047', fontSize: '14', marginRight: 10 }} />Disponivel</td>
                        <td className="align-middle d-flex justify-content-end">
                            <Link to={"/user/" + data.id}><IconButton style={{ marginTop: -32 }}><ArrowForwardIosTwoToneIcon style={{ fontSize: 18 }} /></IconButton></Link>
                        </td>
                    </tr>
                )
            }

            if (data.estado == false || data.estado == null) {
                return (
                    <tr key={index}>
                        <td className="align-middle d-flex justify-content-left"><Avatar style={{ width: 35, height: 35, marginTop: 13 }} alt={data.name} src={data.avatarURL} /><span style={{ marginTop: 18 }} className="ml-4">{data.nome}</span></td>
                        <td className="align-middle"><a className="text-decoration-none" href={`mailto:${data.email}`}><DraftsTwoToneIcon style={{ marginRight: 15 }} />{data.email}</a></td>
                        <td className="align-middle"><FiberManualRecordTwoToneIcon style={{ color: '#ef5350', fontSize: '14', marginRight: 10 }} />Indisponivel</td>
                        <td className="align-middle d-flex justify-content-end">
                            <Link to={"/user/" + data.id}><IconButton style={{ marginTop: -32 }}><ArrowForwardIosTwoToneIcon style={{ fontSize: 18 }} /></IconButton></Link>
                        </td>
                    </tr>

                )
            }

        })
    }
}