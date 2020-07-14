import React from 'react'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Tabelas/table.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import green from '@material-ui/core/colors/green'



//Importação de Componentes

export default class Tabela extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaSolicitacoes: []
        }
    }
    
    render() {
        return (
            <table className="table table-light table-borderless table-hover">
                <thead>
                    <tr className="heigher">
                        <th scope="col" className="align-middle d-none d-sm-table-cell">ID</th>
                        <th scope="col" className="align-middle">Perfil</th>
                        <th scope="col" className="align-middle">Nome</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">Descrição</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">Data</th>
                        <th scope="col" className="align-middle"></th>
                        <th scope="col" className="align-middle"></th>
                        <th scope="col" className="align-middle"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" className="align-middle d-none d-sm-table-cell">1</th>
                        <td className="align-middle"><Avatar alt="Gabriel Ferreira" src={require("../../assets/images/user_image1.jpg")} /></td>
                        <td className="align-middle"> Gabriel Ferreira</td>
                        <td className="align-middle d-none d-sm-table-cell "> Adicionar Competência</td>
                        <td className="align-middle d-none d-sm-table-cell">30/05/2020</td>
                        <td className="align-middle buttons">
                            <IconButton style={{color: green['700']}}  component="span">
                                <CheckTwoToneIcon/>
                            </IconButton>
                        </td>
                        <td className="align-middle buttons">
                            <IconButton color="secondary"  component="span">
                                <ClearTwoToneIcon/>
                            </IconButton>
                        </td>
                        <td className="align-middle buttons">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <VisibilityTwoToneIcon/>
                            </IconButton>

                        </td>
                    </tr>
                </tbody>
            </table>

        );
    }
}