import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//Importação de Componentes
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'

import AvatarGroup from '@material-ui/lab/AvatarGroup';

function GroupAvatars() {
    return (
        <AvatarGroup max={4}>
            <Avatar alt="Gabriel Ferreira" src={require("../../assets/images/user_image1.jpg")} />
            <Avatar alt="Inês Almeida" src={require("../../assets/images/user_image1.jpg")} />
            <Avatar alt="Pedro Lourenço" src={require("../../assets/images/user_image1.jpg")} />
            <Avatar alt="Claudio Baptista" ssrc={require("../../assets/images/user_image1.jpg")} />
            <Avatar alt="Claudio Ferreira" src={require("../../assets/images/user_image1.jpg")} />
        </AvatarGroup>
    );
}


export default class ListCompetencia extends React.Component {



    render() {
        return (
            <table className="table table-light table-borderless table-hover">
                
                <thead>
                    <tr className="heigher " style={{ color: blue['600'] }}>
                        <th scope="col" className="align-middle">ID</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell">Nome</th>
                        <th scope="col" className="align-middle ">Equipa</th>
                        <th scope="col" className="align-middle"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-middle"> 1</td>
                        <td className="align-middle "> Website Grupo Visabeira</td>
                        <td className="align-middle ">
                            <GroupAvatars />
                        </td>
                        <td className="align-middle">
                            <IconButton style={{ color: blue['600'] }} component="span">
                                <EditTwoToneIcon />
                            </IconButton>
                            <IconButton component="span">
                                <VisibilityTwoToneIcon />
                            </IconButton>
                            <IconButton style={{ color: red['300'] }} component="span">
                                <DeleteTwoToneIcon />
                            </IconButton>
                        </td>
                    </tr>
                </tbody>
            </table>

        )
    }
}