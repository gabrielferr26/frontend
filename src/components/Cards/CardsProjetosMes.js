import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



//Importação de Componentes
import { Card } from 'react-bootstrap'


//Importação de Icones
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';


export default class CardUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemProjeto: ""
        };
    }

    componentDidMount() {
        //Contagem de Projetos do Ultimo Mês
        const contarUsers = "https://glacial-stream-93235.herokuapp.com/contagem/users";
        axios.get(contarUsers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ contagemProjeto: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + contarUsers);
            });
    }


    render() {
        return (

            <Card
                className="mt-3 border-0">
                <Card.Body
                    className="ml-4 mr-4 mt-3 mb-3">
                    <div className="d-flex justify-content-left">
                        <EventAvailableTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#26a69a' }} />
                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">Último Mês</h5>
                    </div>
                    <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.contagemProjeto}</p>
                </Card.Body>
                <Card.Footer
                    className="border-0"
                    style={{ backgroundColor: '#26a69a', backgroundSize: 1 }}>
                </Card.Footer>
            </Card>

        );
    }
}