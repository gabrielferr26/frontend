import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



//Importação de Componentes
import { Button, Card } from 'react-bootstrap'


//Importação de Icones
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';


export default class CardUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avaliacao: ""
        };
    }

    componentDidMount() {
        //Avaliação de um Dado User
        const contarUsers = "http://localhost:3000/contagem/users";
        axios.get(contarUsers)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ avaliacao: data });
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
                        <StarTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#ffab40' }} />
                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">Avaliação</h5>
                    </div>
                    <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.avaliacao}</p>
                </Card.Body>
                <Card.Footer className="border-0" style={{ backgroundColor: '#ffab40', backgroundSize: 1 }}></Card.Footer>
            </Card>
        );
    }
}