import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//Importação de Componentes
import { Card } from 'react-bootstrap'

//Importação de Icones
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

export default class CardEditar extends React.Component {
    render() {
        return (
            <Card
                className="mt-3 border-0">
                <Card.Body
                    className="ml-2 mr-2 mt-3 mb-2">
                    <div className="d-flex justify-content-left">
                        <EditTwoToneIcon
                            style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#1976d2' }} />
                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">{this.props.titulo}</h5>
                    </div>

                </Card.Body>
                <Card.Footer
                    className="border-0"
                    style={{ backgroundColor: '#1976d2', backgroundSize: 1 }}>
                </Card.Footer>
            </Card>
        );
    }
}