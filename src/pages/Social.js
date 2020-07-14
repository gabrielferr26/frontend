import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios'



//Importação de Componentes
import Navbar from '../components/Navbar/Navbar'
import ListaDevelopers from '../components/Lists/ListaDevelopers'
import CardDevelopers from '../components/Cards/CardsTotalUsers'
import { Button, Card } from 'react-bootstrap';
import CardSkills from '../components/Cards/CardTotalSkills'
import CardInteresses from '../components/Cards/CardTotalInteresses'
import CardProjetos from '../components/Cards/CardTotalProjetos'
import UsersDisponiveis from '../components/Lists/ListaDevelopersDisponiveis'


//Importação de Icones


export default class Social extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <h5 style={{ fontFamily: 'BoldG', fontSize: 24, marginLeft: 15, marginTop: 70 }}>Social</h5>
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Social</li>
                            </ol>
                        </nav>
                    </div>
                    <div style={{ marginTop: -22 }} className="row ml-1 mr-4">
                        <CardDevelopers />
                        <CardSkills />
                        <CardInteresses />
                        <CardProjetos />
                        <ListaDevelopers />
                        <div className="col-xl-6 mt-3">
                            <UsersDisponiveis />
                        </div>
                    </div>

                </main>

            </div>
        )
    }
}