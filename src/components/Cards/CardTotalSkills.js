import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



//Importação de Componentes
import { Button, Card } from 'react-bootstrap'


//Importação de Icones
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';

export default class CardUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemSkills: ""
        };
    }

    componentDidMount() {

        //Contagem de Skills
        const contarSkills = "https://glacial-stream-93235.herokuapp.com/contagem/skills";
        axios.get(contarSkills)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ contagemSkills: data });
                }
                else {
                    alert("Error Web Service")
                }
            })

            .catch(error => {
                alert("ERRO: " + error + "URL" + contarSkills);
            });
    }


    render() {
        return (
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
                <Card
                    className="mt-3 border-0">
                    <Card.Body
                        className="ml-4 mr-4 mt-3 mb-3">
                        <div className="d-flex justify-content-left">
                            <WorkTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#1976d2' }} />
                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">Nº de Skills</h5>
                        </div>
                        <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.contagemSkills}</p>
                    </Card.Body>
                    <Card.Footer
                        className="border-0" style={{ backgroundColor: '#1976d2', backgroundSize: 1 }}>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}