import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//Importação de Componentes
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

function ImageAvatars() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
        </div>
    );
}

export default class ListUsers extends React.Component {

    render() {
        return (
            <table className="table  table-light table-borderless table-hover">
                <thead>
                    <tr className="heigher " style={{ color: blue['600'] }}>
                        <th scope="col" className="align-middle">Perfil</th>
                        <th scope="col" className="align-middle ">Nome</th>
                        <th scope="col" className="align-middle ">Competências</th>
                        <th scope="col" className="align-middle d-none d-sm-table-cell ">E-mail</th>
                        <th scope="col" className="align-middle"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-middle"> <ImageAvatars /> </td>
                        <td className="align-middle"> Gabriel Ferreira</td>
                        <td className="align-middle "> NodeJS </td>
                        <td className="align-middle d-none d-sm-table-cell"> tecpt19@gmail.com </td>
                        <td className="align-middle">
                            <IconButton style={{ color: blue['600'] }} component="span">
                                <VisibilityTwoToneIcon />
                            </IconButton>
                        </td>
                    </tr>
                </tbody>
            </table>

        )
    }
}