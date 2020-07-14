import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



//Importação de Componentes
import { Card } from 'react-bootstrap'


//Importação de Icones
import AccountTreeTwoToneIcon from '@material-ui/icons/AccountTreeTwoTone';

export default class CardUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contagemProjetos: ""
        };
    }

    componentDidMount() {

        //Contagem de Projetos de um Dado User
        const contarSkills = "https://glacial-stream-93235.herokuapp.com/contagem/projetos";
        axios.get(contarSkills)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ contagemProjetos: data });
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
                            <AccountTreeTwoToneIcon style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#ffab40' }} />
                            <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">Nº de Projetos</h5>
                        </div>
                        <p style={{ fontFamily: 'LightG', fontSize: 20, marginTop: -40 }} className="card-text ml-4 d-flex justify-content-end">{this.state.contagemProjetos}</p>
                    </Card.Body>
                    <Card.Footer
                        className="border-0" style={{ backgroundColor: '#ffab40', backgroundSize: 1 }}>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}