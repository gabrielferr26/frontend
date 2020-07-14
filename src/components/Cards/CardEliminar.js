import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//Importação de Componentes
import { Card } from 'react-bootstrap'

//Importação de Icones
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

export default class CardEditar extends React.Component {
    render() {
        return (
            <Card
                className="mt-3 border-0">
                <Card.Body
                    className="ml-1 mr-1 mt-3 mb-2">
                    <div className="d-flex justify-content-left">
                        <DeleteTwoToneIcon
                            style={{ marginRight: 18, fontSize: 35, marginTop: 2, color: '#ef5350' }} />
                        <h5 style={{ fontFamily: 'BoldG', fontSize: 20 }} className="card-title mt-2">{this.props.titulo}</h5>
                    </div>

                </Card.Body>
                <Card.Footer
                    className="border-0"
                    style={{ backgroundColor: '#ef5350', backgroundSize: 1 }}>
                </Card.Footer>
            </Card>
        );
    }
}