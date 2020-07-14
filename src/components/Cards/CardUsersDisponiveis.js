import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



//Importação de Componentes
import { Card } from 'react-bootstrap'


//Importação de Icones
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';


export default class CardUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemUserDisponiveis: ""
        };
    }

    componentDidMount() {
        //Contagem de Interesses
        const contarInteresses = "https://glacial-stream-93235.herokuapp.com/contagem/users/disponiveis";
        axios.get(contarInteresses)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ contagemUserDisponiveis: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + contarInteresses);
            });
    }


    render() {
        return (

            <Card
                className="mt-3 border-0">
                <Card.Body
                    className="ml-4 mr-4 mt-3 mb-3">
                    <div className="d-flex justify-content-left">
                        <FiberManualRecordTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#43a047' }} />
                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">Users Disponíveis</h5>
                    </div>
                    <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.contagemUserDisponiveis}</p>
                </Card.Body>
                <Card.Footer className="border-0" style={{ backgroundColor: '#43a047', backgroundSize: 1 }}></Card.Footer>
            </Card>

        );
    }
}