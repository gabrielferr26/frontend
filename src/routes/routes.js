import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Admin Rotas
import Dashboard from '../pages/Admin/Dashboard'
import Adicionar_Funcionario from '../pages/Admin/AdicionarFuncionario'
import Adicionar_Competencia from '../pages/Admin/AdicionarCompetencia'
import Adicionar_Categoria from '../pages/Admin/AdicionarCategoria'
import Adicionar_Projeto from '../pages/Admin/AdicionarProjeto'
import Adicionar_Interesse from '../pages/Admin/AdicionarInteresse'
import Adicionar_Habilitacao from '../pages/Admin/AdicionarTipoHabilitação'
import Lista_Funcionarios from '../pages/Admin/ListaFuncionarios'
import Lista_Competencias from '../pages/Admin/ListaCompetencias'
import Lista_Projetos from '../pages/Admin/ListaProjetos'
import Lista_Interesses from '../pages/Admin/ListaInteresses'
import Perfil from '../pages/Admin/Perfil'
import View_Projeto from '../pages/Admin/ViewProject'
import View_Competencia from '../pages/Admin/ViewCompetencia';
import View_Interesse from '../pages/Admin/ViewInteresse';
import Edit_Competencia from '../pages/Admin/EditarCompetencia'
import Edit_Projeto from '../pages/Admin/EditarProjeto';
import Edit_Interesse from '../pages/Admin/EditarInteresse';
import Lista_TeamLead from '../pages/Admin/ListaTeamLead'
import Lista_Developer from '../pages/Admin/ListaDevelopers'
//Team Lead - Rotas
import DashboardTeamLead from '../pages/Team Lead/Dashboard'
import Criar_Equipa from '../pages/Team Lead/CriarEquipa'
import Lista_Equipas from '../pages/Admin/ListaEquipas'

//Autenticação Rotas

import Login from '../pages/Login'

export default function App() {
    return (
        <Router>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route path="/adicionar/funcionario" component={Adicionar_Funcionario} />
            <Route path="/adicionar/competencia" component={Adicionar_Competencia} />
            <Route path="/adicionar/categoria" component={Adicionar_Categoria} />
            <Route path="/adicionar/habilitacao" component={Adicionar_Habilitacao} />
            <Route path="/adicionar/projeto" component={Adicionar_Projeto} />
            <Route path="/adicionar/interesse" component={Adicionar_Interesse} />
            <Route path="/lista/funcionarios" component={Lista_Funcionarios} />
            <Route path="/lista/competencias" component={Lista_Competencias} />
            <Route path="/lista/projetos" component={Lista_Projetos} />
            <Route path="/lista/interesses" component={Lista_Interesses} />
            <Route path="/funcionario/:id" component={Perfil} />
            <Route path="/projeto/:id" component={View_Projeto} />
            <Route path="/competencia/:id" component={View_Competencia} />
            <Route path="/interesse/:id" component={View_Interesse} />
            <Route path="/editar/competencia/:id" component={Edit_Competencia} />
            <Route path="/editar/projeto" component={Edit_Projeto} />
            <Route path="/editar/interesse/:id" component={Edit_Interesse} />
            <Route path="/dashboard/:id" component={DashboardTeamLead} />
            <Route path="/lista/teamlead" component={Lista_TeamLead} />
            <Route path="/lista/developers" component={Lista_Developer} />
            <Route path="/criarequipa" component={Criar_Equipa} />
            <Route path="/equipas" component={Lista_Equipas} />
            <Route exact path="/" component={Login} />
        </Router>
    )
}
