import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import axios from 'axios'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import { Button, Card } from 'react-bootstrap';
import CardTotalInteresses from '../components/Cards/CardTotalInteresses'
import MyCardEditar from '../components/Cards/CardEditar'
import MyCardEliminar from '../components/Cards/CardEliminar'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar'
import Swal from 'sweetalert2'



//Importação de Icones
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';


const baseURL = "https://glacial-stream-93235.herokuapp.com"

export default class Interesse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemInteresses: "",
            interesse: "",
            listaUsersInteresse: [],
            interesseId: "",
            listaInteresses: [],
            redirect: false
        };
    }


    componentDidMount() {

        //Contagem de Users com Dado Interesse
        let interesseId = this.props.match.params.id;
        const urlInteresse = baseURL + "/totalusers/interesse/" + interesseId;
        axios.get(urlInteresse)
            .then(res => {
                if (res.data.success) {

                    const data = res.data.data;
                    this.setState({ contagemInteresses: data })


                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("OK: " + error + " - URL: " + urlInteresse);
            });

        //Informação do Interesse
        let nomeInteresse = this.props.match.params.id;
        const Interesse = baseURL + "/interesse/" + nomeInteresse;
        axios.get(Interesse)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ interesse: data.interesse, interesseId: data.id })
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("OK: " + error + " - URL: " + Interesse);
            });


        //Users com um dado Interesse
        let idInteresse = this.props.match.params.id;
        const InteresseUser = baseURL + "/interesse/total/users/" + idInteresse;
        axios.get(InteresseUser)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({
                        listaUsersInteresse: data
                    })
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("OK: " + error + " - URL: " + InteresseUser);
            });


    }

    render() {

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{
                pathname: "/lista/interesses"
            }} />;
        }
        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>{this.state.interesse}</h5>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/admin/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active"><Link to={"/lista/interesses"}>Interesses</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{this.state.interesse}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-4">
                        <CardTotalInteresses />
                        <div className="col-xl-5">
                            <Card
                                className="mt-3 border-0">
                                <Card.Body
                                    className="ml-4 mr-4 mt-3 mb-3">
                                    <div className="d-flex justify-content-left">
                                        <FavoriteTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#ef5350' }} />
                                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">{this.state.interesse}</h5>
                                    </div>
                                    <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.contagemInteresses}</p>
                                </Card.Body>
                                <Card.Footer className="border-0" style={{ backgroundColor: '#ef5350', backgroundSize: 1 }}></Card.Footer>
                            </Card>
                        </div>
                        <div className="col-xl-2">
                            <MyCardEditar titulo="Editar Interesse" />
                        </div>
                        <div className="col-xl-2">
                            <Link
                                style={{ textDecoration: 'none', color: 'black' }}
                                to={"/lista/interesses"}
                                onClick={() => this.sendDeleteInteresse(this.state.interesseId)}>
                                <MyCardEliminar titulo="Eliminar Interesse" />
                            </Link>
                        </div>
                        <div className="col-xl-12">
                            <table className="table table-borderless table-hover ml-1 " >
                                <tbody style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                    {this.loadFillUsersInteresse()}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </main>
            </div>
        )
    }

    loadFillUsersInteresse() {
        return this.state.listaUsersInteresse.map((data, index) => {
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

    //Eliminar um Interesse
    sendDeleteInteresse(interesseId1) {

        const baseURL = "https://glacial-stream-93235.herokuapp.com/admin/eliminar/interesse"

        const datapost = {
            id: interesseId1,
        }

        axios.post(baseURL, datapost)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Eliminado',
                        'O Interesse ' + this.state.interesse + ' foi Eliminado!',
                        'success'
                    )
                    this.setState({ redirect: true })
                }
                else {
                    alert(response.data.message)
                }

            }).catch(error => {
                alert("Error 34" + error)
            })
    }


}