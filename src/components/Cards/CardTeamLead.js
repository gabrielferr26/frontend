import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import authHeader from '../../pages/Auth-Header'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

//Importação de Componentes
import { Card } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'

//Importação de Icones
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default class CardTeamLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaFuncionario: [],
      id: "",
      nome: "",
      avatarURL: "",
      tipo: ""
    };
  }

  componentDidMount() {

    //Lista de Team Leads
    const url = "http://localhost:3000/lista/teamlead";
    axios.get(url, { headers: authHeader() })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          const data = res.data.data;
          this.setState({ listaFuncionario: data });
        }
        else {
          alert("Error Web Service");
        }
      })
      .catch(error => {
        alert("ERRO: " + error + " - URL: " + url);
      });

    //Verificar User
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

  render() {
    return (
      <div className="col-xl-4 mt-3">
        {this.loadFillTeamLead()}
      </div>
    );
  }

  //Lista de Team Lead
  loadFillTeamLead() {
    return this.state.listaFuncionario.slice(0, 4).map((data, index) => {
      return (
        <div key={index}>
          <Card style={{ border: 'none' }} className="mb-2">
            <Card.Body className="card-body">
              <div className="row justify-content-left">
                <div className="align-middle mt-3 ml-4 mr-4">
                  <Avatar style={{ width: 45, height: 45 }} alt={data.nome} src={data.avatarURL} />
                </div>
                <Link style={{textDecoration:'none', color:'black'}} to={"/user/" + data.id}>
                  <div className="align-middle mt-3">
                    <h5 style={{ fontFamily: 'BoldG' }} className="card-title mt-2">{data.nome}</h5>
                    <p style={{ marginTop: -14, fontFamily: 'RegularG' }} className="card-text"><p>{data.cargo.cargo}</p></p>
                  </div>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div >
      )
    });
  }
}















