import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    BrowserRouter as Router,
    Link,

} from "react-router-dom";
import axios from 'axios'
import '../style.css'

//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2'
import { ProgressBar, CardColumns, Card, Button } from 'react-bootstrap';


//Importação de Icones
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import SentimentSatisfiedAltTwoToneIcon from '@material-ui/icons/SentimentSatisfiedAltTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentDissatisfiedTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@material-ui/icons/SentimentVerySatisfiedTwoTone';
import BatteryCharging20TwoToneIcon from '@material-ui/icons/BatteryCharging20TwoTone';
import BatteryCharging60TwoToneIcon from '@material-ui/icons/BatteryCharging60TwoTone';
import BatteryChargingFullTwoToneIcon from '@material-ui/icons/BatteryChargingFullTwoTone';
import CompareArrowsTwoToneIcon from '@material-ui/icons/CompareArrowsTwoTone';
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';




const baseURL = "https://glacial-stream-93235.herokuapp.com"

export default class EquipaCriada extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaDevelopers: [],
            dataProjetoEquipa: [],
            listaUsers: [],
            campNomeEquipa: "",
            campNomeProjeto: "",
            campCliente: "",
            dataInicio: "",
            dataFim: "",
            estado: "",
            idProjeto: "",
            idEquipa: "",
            idUsuario: [],
            listaCompare: [],
            listaAllUsers: []

        };
    }

    //Selecionar Users to Compare
    handleClickSelectUser = (userId) => {

        const listaCompare = this.state.listaCompare

        listaCompare.push({
            id: userId
        });

        this.setState({
            listaCompare: listaCompare,

        })

        console.log(`Numero de Elementos:`, JSON.stringify(this.state.listaCompare, null))
    }

    handleClickRemoveCompare(event, i) {
        let listaCompare = this.state.listaCompare.slice()

        listaCompare.splice(i, 1)
        this.setState({
            listaCompare
        })
    }

    componentDidMount() {

        const developers = "https://glacial-stream-93235.herokuapp.com/lista/developers";
        axios.get(developers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaDevelopers: data });
                } else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + developers);
            });

        //Lista de Todos os Funcionarios
        const allusers = "https://glacial-stream-93235.herokuapp.com/lista/users";
        axios.get(allusers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaAllUsers: data });
                } else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + allusers);
            });

        //Informações do Novo Projeto / Equipa 
        let teamId = this.props.match.params.id;
        const url = baseURL + "/teamlead/novaequipa/" + teamId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0]
                    this.setState({
                        dataProjetoEquipa: data,
                        idProjeto: data.projeto.id,
                        campNomeEquipa: data.nome,
                        campNomeProjeto: data.projeto.nome,
                        campCliente: data.projeto.cliente,
                        dataInicio: data.projeto.inicio,
                        dataFim: data.projeto.fim,
                        estado: data.projeto.estado,
                        idEquipa: data.id
                    })
                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("Error Server " + error)
            })

        //Informações dos Users da Nova Equipa / Projeto 
        let usersId = this.props.match.params.id;
        const users = baseURL + "/teamlead/equipa/projetos/users/" + usersId;
        axios.get(users)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({
                        listaUsers: data
                    });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + users);
            });


        console.log(this.state.listaUsers)
    }



    render() {
        return (
            <div>
                <Navbar />
                <main style={{ marginBottom: 130 }}>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>A Minha Equipa</h5>
                    <div className="float-right">
                        <Link to="/lista/projetos">
                            <Button
                                variant="outline-danger"
                                style={{ marginTop: -40, borderRadius: 50, width: 140, height: 52, marginRight: 10, border: 'none', fontSize: 16 }}
                                type="button"
                                onClick={() => this.sendDelete(this.state.idProjeto, this.state.idEquipa, this.state.idUsuario)}>Cancelar
                            </Button>
                        </Link>
                        <Link to="/lista/projetos">
                            <Button
                                style={{ marginTop: -40, borderRadius: 50, width: 140, height: 52, marginRight: 40, backgroundColor: '#1976d2', border: 'none', fontSize: 16 }}
                                type="button"
                                onClick={() => this.saveTeam()}
                                className="btn btn-primary">Confirmar
                            </Button>
                        </Link>
                    </div>
                    <div className="">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/admin/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active"><Link to={"/criarequipa"}>Criar Equipa</Link></li>
                                <li className="breadcrumb-item active">{this.state.campNomeEquipa}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row ml-1 mr-4">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-xl-6">
                                    <Card className="border-0 mb-4">
                                        <Card.Body className="ml-2 mb-2 mr-3 mt-2">
                                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2 ml-3 mb-2">
                                                Dados da Equipa
                                                    </h5>
                                            <ul>
                                                {this.Media()}
                                                {this.Quimica()}

                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-xl-6">
                                    <Card className="border-0 mb-4">
                                        <Card.Body className=" ml-4 mb-3 mr-4 mt-3">
                                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20, marginRight: 20 }} className="card-title">
                                                {this.state.campNomeProjeto}
                                            </h5>
                                            <h6 style={{ fontFamily: 'RegularG', marginTop: -2, fontSize: 18 }} className="card-text mb-2">
                                                {this.state.campCliente}
                                            </h6>
                                            <ul>
                                                <li className="mt-4">
                                                    <EventNoteTwoToneIcon style={{ marginRight: 10, color: '#1976d2', fontSize: 25 }} />
                                                    <span>
                                                        <span style={{ fontFamily: 'BoldG', marginRight: 5, fontSize: 16 }}>Inicio:</span> {this.state.dataInicio}
                                                    </span>
                                                </li>
                                                <li className="mt-3">
                                                    <EventAvailableTwoToneIcon style={{ marginRight: 10, color: '#43a047', fontSize: 25 }} />
                                                    <span>
                                                        <span style={{ fontFamily: 'BoldG', marginRight: 5, fontSize: 16 }}>Conclusão:</span> {this.state.dataFim}
                                                    </span>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 mr-2 ml-1">
                                {this.loadFillUsers()}
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <Card className="border-0">
                                <Card.Body className="ml-2 mb-3 mr-1 mt-3">
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2 ml-3 mb-4">
                                        <AccountCircleTwoToneIcon style={{ color: '#1976d2', fontSize: 35, marginRight: 15 }} />
                                        Outros Developers
                                         </h5>
                                    {this.loadFillDevelopers()}
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-xl-9">
                            {this.state.listaCompare.length > 0 ?
                                <Card className="border-0">
                                    <Card.Body className="ml-3 mr-3 mt-3 mb-3">
                                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2 ml-3 mb-4">
                                            <CompareArrowsTwoToneIcon style={{ color: '#1976d2', fontSize: 35, marginRight: 15 }} />
                                            <span>Comparar</span>
                                        </h5>
                                        <div className="row">
                                            {this.loadFillCompare()}
                                        </div>
                                    </Card.Body>
                                </Card> : null}
                        </div>
                    </div>
                </main>
            </div >
        )
    }


    loadFillTeamLead() {
        return this.state.listaDevelopers.map((data, index) => {
            if (data.estado === true && data.cargo.id === 2) {
                return (
                    <li key={index} style={{ borderRadius: 5 }} className="list-group-item border-0 ">
                        <Link style={{ color: 'black' }} to={"/user/" + data.id}>
                            <div className="d-flex justify-content-left">
                                <Avatar style={{ width: 35, height: 35 }} alt={data.name} src={data.avatarURL} />
                                <span style={{ fontFamily: 'RegularG', fontSize: 16 }} className="ml-4 mt-1">{data.nome}</span>
                            </div>
                        </Link>
                        <div style={{ marginTop: -42 }} className="d-flex justify-content-end">
                            <IconButton
                                style={{ marginRight: 10 }}
                                onClick={() => this.handleClickSelectUser(data.id)}>
                                <CompareArrowsTwoToneIcon style={{ color: '#26a69a' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => this.sendUser(data.id, this.state.idEquipa)}>
                                <AddTwoToneIcon style={{ color: '#1976d2' }} />
                            </IconButton>

                        </div>
                    </li>
                )
            }
        })

    }



    loadFillDevelopers() {
        return this.state.listaDevelopers.map((data, index) => {
            if (data.estado === true && data.cargo.id === 3) {
                return (
                    <li key={index} style={{ borderRadius: 5 }} className="list-group-item border-0 ">
                        <Link style={{ color: 'black' }} to={"/user/" + data.id}>
                            <div className="d-flex justify-content-left">
                                <Avatar style={{ width: 35, height: 35 }} alt={data.name} src={data.avatarURL} />
                                <span style={{ fontFamily: 'RegularG', fontSize: 16 }} className="ml-4 mt-1">{data.nome}</span>
                            </div>
                        </Link>
                        <div style={{ marginTop: -42 }} className="d-flex justify-content-end">
                            <IconButton
                                style={{ marginRight: 10 }}
                                onClick={() => this.handleClickSelectUser(data.id)}>
                                <CompareArrowsTwoToneIcon style={{ color: '#26a69a' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => this.sendUser(data.id, this.state.idEquipa)}>
                                <AddTwoToneIcon style={{ color: '#1976d2' }} />
                            </IconButton>

                        </div>
                    </li>
                )
            }
        })
    }

    loadFillNiveis(aux) {
        return this.state.listaUsers.map((data, index) => {
            return data.users.map((data1, index1) => {
                return data1.skills.map((data2, index2) => {
                    if (data1.id === data2.user_skills.userId && data2.user_skills.userId === aux) {
                        return (
                            <li key={index, index1, index2} className="list-group-item border-0"><span style={{ fontFamily: 'RegularG', fontSize: 16 }}>{data2.skill}</span>
                                <span className="item"><ProgressBar now={data2.user_skills.nivelComp}
                                    style={{ marginTop: 8, borderRadius: 50 }} />
                                </span>
                            </li>
                        )
                    }
                })

            })
        })
    }

    loadFillCompare() {
        return this.state.listaAllUsers.map((data, index) => {
            return this.state.listaCompare.map((data1, index1) => {
                if (data.id === data1.id) {
                    return (
                        <div className="col-xl-4">
                            <Card key={index, index1} className="text-center border-0" style={{ marginTop: -25 }}>
                                <Card.Body className="ml-3 mr-3 mt-4 mb-4">
                                    <div className="d-flex justify-content-end">
                                        <IconButton
                                            style={{ marginTop: -25 }}
                                            onClick={() => this.handleClickRemoveCompare()}>
                                            <ClearTwoToneIcon />
                                        </IconButton>
                                    </div>
                                    <div className="d-flex justify-content-center mb-4">
                                        <Avatar style={{ width: 70, height: 70, marginTop: -15 }} alt={data.nome} src={data.avatarURL} />
                                    </div>
                                    <h5 style={{ fontFamily: 'BoldG', fontSize: 18 }} className="card-title">{data.nome}</h5>
                                    <p style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -10 }} className="card-text">{data.cargo.cargo}</p>
                                    <Link to={"/user/" + data.id}>
                                        <Button
                                            style={{ borderRadius: 55, width: 100, height: 35, backgroundColor: '#2C3E50', border: 'none' }}
                                            className="btn btn-primary align-middle mb-3">
                                            <span style={{ fontFamily: 'RegularG', fontSize: 14 }}>Ver Perfil</span>
                                        </Button>
                                    </Link>
                                    {this.loadFillNiveisCompare(data1.id)}
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
            })
        })
    }


    loadFillNiveisCompare(aux1) {
        return this.state.listaAllUsers.map((data, index) => {
            return data.skills.map((data1, index1) => {
                if (data.id === data1.user_skills.userId && data1.user_skills.userId === aux1) {
                    return (
                        <li key={index, index1} className="list-group-item border-0">
                            <span style={{ fontFamily: 'RegularG', fontSize: 16 }}>
                                {data1.skill}
                            </span>
                            <div className="d-flex justify-content-center">
                                <span className="item "><ProgressBar now={data1.user_skills.nivelComp}
                                    style={{ marginTop: 8, borderRadius: 50, width: 270 }} />
                                </span>
                            </div>
                        </li>
                    )
                }
            })
        })
    }


    Media() {

        var media = 0
        var soma = 0
        var nSkills = 0

        this.state.listaUsers.map((data, index) => {
            data.users.map((data1, index1) => {
                data1.skills.map((data2, index2) => {
                    if (data1.id === data2.user_skills.userId) {
                        soma = soma + data2.user_skills.nivelComp
                        nSkills = nSkills + 1
                        media = soma / nSkills
                    }
                })
            })
        })

        var removedDecimal = Math.trunc(media);

        if (removedDecimal > 79) {
            return (
                <li className="mt-4 ml-3 mr-3">
                    <SentimentVerySatisfiedTwoToneIcon style={{ marginRight: 15, color: '#43a047', fontSize: 26 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 18 }}>
                        Média da Equipa:
                        <span className="ml-2" style={{ fontFamily: 'LightG', fontSize: 18 }}>
                            {removedDecimal}
                            <span className="item"><ProgressBar now={removedDecimal}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }

        if (removedDecimal > 49 && removedDecimal < 80) {
            return (
                <li className="mt-4 ml-3 mr-3">
                    <SentimentSatisfiedAltTwoToneIcon style={{ marginRight: 15, color: '#ffb74d', fontSize: 26 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>
                        Média da Equipa:
                        <span className="ml-2" style={{ fontFamily: 'LightG', fontSize: 16 }}>
                            {removedDecimal}
                            <span className="item"><ProgressBar now={removedDecimal}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }

        if (removedDecimal < 50) {
            return (
                <li className="mt-4 ml-3 mr-3">
                    <SentimentDissatisfiedTwoToneIcon style={{ marginRight: 15, color: '#ef5350', fontSize: 26 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>
                        Média da Equipa:
                        <span className="ml-2" style={{ fontFamily: 'LightG', fontSize: 16 }}>
                            {removedDecimal}
                            <span className="item"><ProgressBar now={removedDecimal}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }
    }

    Quimica() {


        var contadorTotal = 0
        var contadorCertos = 0

        this.state.listaUsers.map((data, index) => {
            this.state.listaUsers.map((data1, index1) => {
                data.users.map((data2, index2) => {
                    data1.users.map((data3, index3) => {
                        if (data2.id != data3.id) {
                            data2.skills.map((data4, index4) => {
                                data3.skills.map((data5, index5) => {
                                    if (data4.id === data5.id) {
                                        contadorTotal = contadorTotal + 1
                                        contadorCertos = contadorCertos + 3
                                    }

                                    else {
                                        contadorTotal = contadorTotal + 1
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })

        var quimica = Math.trunc(contadorCertos / contadorTotal * 100)

        if (quimica > 74) {
            return (
                <li className="mt-3 ml-3 mr-3">
                    <BatteryChargingFullTwoToneIcon style={{ marginRight: 15, marginLeft: -3, color: '#43a047', fontSize: 28 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>
                        Quimica: <span className="ml-1" style={{ fontFamily: 'LightG', fontSize: 16 }}>
                            {quimica}
                            <span className="item"><ProgressBar variant="success" now={quimica}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }

        if (quimica > 49 && quimica < 75) {
            return (
                <li className="mt-3 ml-3 mr-3">
                    <BatteryCharging60TwoToneIcon style={{ marginRight: 15, marginLeft: -3, color: '#ffb74d', fontSize: 28 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>
                        Quimica:
                        <span className="ml-1" style={{ fontFamily: 'LightG', fontSize: 16 }}>
                            {quimica}
                            <span className="item"><ProgressBar variant="warning" now={quimica}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }

        if (quimica < 50) {
            return (
                <li className="mt-3 ml-3 mr-3">
                    <BatteryCharging20TwoToneIcon style={{ marginRight: 15, marginLeft: -3, color: '#ef5350', fontSize: 28 }} />
                    <span style={{ fontFamily: 'BoldG', fontSize: 16 }}>
                        Quimica: <span className="ml-1" style={{ fontFamily: 'LightG', fontSize: 16 }}>
                            {quimica}
                            <span className="item"><ProgressBar variant="danger" now={quimica}
                                style={{ marginTop: 8, borderRadius: 50, height: 10 }} />
                            </span>
                        </span>
                    </span>
                </li>
            )
        }

    }


    loadFillUsers() {
        return this.state.listaUsers.map((data, index) => {
            return data.users.map((data1, index1) => {
                return (
                    <Card key={index, index1} className="mb-4  text-center border-0 ">
                        <Card.Body className="card-body mb-4">
                            <div className="d-flex justify-content-end">
                                <IconButton
                                    onClick={() => this.sendDeleteUser(data1.id, this.state.idEquipa)}>
                                    <ClearTwoToneIcon />
                                </IconButton>
                            </div>
                            <div className="d-flex justify-content-left">
                                <IconButton
                                    style={{ marginTop: -50 }}
                                    onClick={() => this.handleClickSelectUser(data1.id)}>
                                    <CompareArrowsTwoToneIcon style={{ color: '#26a69a' }} />
                                </IconButton>
                            </div>
                            <div className="d-flex justify-content-center mb-4">
                                <Avatar style={{ width: 80, height: 80, marginTop: -15 }} alt={data1.nome} src={data1.avatarURL} />
                            </div>
                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title">{data1.nome}</h5>
                            <p style={{ fontFamily: 'RegularG', fontSize: 16, marginTop: -10 }} className="card-text">{data1.cargo.cargo}</p>
                            <Link to={"/user/" + data1.id}>
                                <Button
                                    style={{ borderRadius: 55, width: 120, height: 40, backgroundColor: '#2C3E50', border: 'none' }}
                                    className="btn btn-primary align-middle mb-3">
                                    Ver Perfil
                                </Button>
                            </Link>
                            {this.loadFillNiveis(data1.id)}
                        </Card.Body>
                    </Card >
                )
            })
        })
    }


    //Aviso Antes de Cancelar a Criação da Equipa
    onDelete(id) {
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Estes dados não serão recuperados',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        })
            .then((result) => {
                if (result.value) {
                    this.sendDelete(id)
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Your imaginay file is safe :)',
                        'error'
                    )
                }
            })
    }


    //Eliminar a Criação da Equipa
    sendDelete(projetoId, equipaId, userId) {
        const baseUrl = "https://glacial-stream-93235.herokuapp.com/teamlead/eliminar/equipa/projeto"

        this.state.listaUsers.map((data, index) => {
            data.users.map((data1, index1) => {

                axios.post(baseUrl, {
                    id: projetoId,
                    idEquipa: equipaId,
                    idUser: data1.id
                })
                    .then(response => {
                        if (response.data.success) {
                            Swal.fire(
                                'Eliminado',
                                'A Equipa ' + this.state.campNomeEquipa + ' foi Eliminada!',
                                'success'
                            )
                        }
                    })

                    .catch(error => {
                        alert("Error 325")
                    })

                console.log(data1.id)
            })
        })
    }

    //Eliminar um User
    sendDeleteUser(userId, teamId) {
        const baseUrl = "https://glacial-stream-93235.herokuapp.com/teamlead/eliminar/equipa/projeto/user"

        axios.post(baseUrl, {
            id: userId,
            idEquipa: teamId
        })
            .then(response => {
                if (response.data.success) {
                    this.loadFillNewUsers()
                    this.loadFillNewDevelopers()

                }
            })



            .catch(error => {
                alert("Error 325")
            })
    }

    //Adicionar um User
    sendUser(userId, teamId) {
        const baseUrl = "https://glacial-stream-93235.herokuapp.com/teamlead/adicionar/equipa/projeto/user"
        axios.post(baseUrl, {
            id: userId,
            idEquipa: teamId
        })
            .then(response => {
                if (response.data.success) {
                    this.loadFillNewUsers()
                    this.loadFillNewDevelopers()

                }
            })


            .catch(error => {
                alert("Error 325")
            })
    }

    saveTeam() {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'A Equipa ' + this.state.campNomeEquipa + ' foi Adicionada',
            showConfirmButton: false,
            timer: 1500,

        })
    }

    componentDidMount() {

        this.loadFillNewUsers()
        this.loadFillNewDevelopers()

        const developers = "https://glacial-stream-93235.herokuapp.com/lista/developers";
        axios.get(developers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaDevelopers: data });
                } else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + developers);
            });

        //Lista de Todos os Funcionarios
        const allusers = "https://glacial-stream-93235.herokuapp.com/lista/users";
        axios.get(allusers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaAllUsers: data });
                } else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + allusers);
            });

        //Informações do Novo Projeto / Equipa 
        let teamId = this.props.match.params.id;
        const url = baseURL + "/teamlead/novaequipa/" + teamId;
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0]
                    this.setState({
                        dataProjetoEquipa: data,
                        idProjeto: data.projeto.id,
                        campNomeEquipa: data.nome,
                        campNomeProjeto: data.projeto.nome,
                        campCliente: data.projeto.cliente,
                        dataInicio: data.projeto.inicio,
                        dataFim: data.projeto.fim,
                        estado: data.projeto.estado,
                        idEquipa: data.id
                    })
                }
                else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("Error Server " + error)
            })

        //Informações dos Users da Nova Equipa / Projeto 
        let usersId = this.props.match.params.id;
        const users = baseURL + "/teamlead/equipa/projetos/users/" + usersId;
        axios.get(users)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({
                        listaUsers: data
                    });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + users);
            });


        console.log(this.state.listaUsers)
    }

    loadFillNewUsers() {

        //Informações dos Users da Nova Equipa / Projeto 
        let usersId = this.props.match.params.id;
        const users = baseURL + "/teamlead/equipa/projetos/users/" + usersId;
        axios.get(users)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({
                        listaUsers: data
                    });
                }
                else {
                    alert("Error Web Service");
                }
            })
            .catch(error => {
                alert("ERRO: " + error + " - URL: " + users);
            });


        console.log(this.state.listaUsers)

    }

    loadFillNewDevelopers() {
        const developers = "https://glacial-stream-93235.herokuapp.com/lista/developers";
        axios.get(developers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listaDevelopers: data });
                } else {
                    alert("Error Web Service")
                }
            })
            .catch(error => {
                alert("ERRO: " + error + "URL" + developers);
            });

    }



}
