import React from 'react';
import './style.css'
import AuthService from './pages/Auth.Service'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




import Adicionar_Projeto from './pages/AdicionarProjeto'

import Adicionar_Habilitacao from './pages/AdicionarTipoHabilitação'
import Lista_Competencias from './pages/ListaSkills'
import Lista_Projetos from './pages/ListaProjetos'
import Lista_Interesses from './pages/ListaInteresses'
import View_Funcionario from './pages/Perfil'



import Lista_TeamLead from './pages/ListaTeamLead'
import Lista_Developer from './pages/ListaDevelopers'
import Criar_Equipa from './pages/CriarEquipa'
import EquipaCriada from './pages/EquipaCriada'
import Interesse from './pages/Interesse'
import Skill from './pages/Skill'
import Projeto from './pages/Projeto'
import TodosProjetos from './pages/TodosProjetos'
import EditarSkill from './pages/EditarSkill'
import EditarUser from './pages/EditarUser'




//Rotas
import Dashboard from './pages/Dashboard'
import AdicionarUser from './pages/AdicionarUser'
import Adicionar_Competencia from './pages/AdicionarSkill'
import Adicionar_Categoria from './pages/AdicionarCategoria'
import Adicionar_Interesse from './pages/AdicionarInteresse'
import Social from './pages/Social'






export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: { email: "Anonimo" }
    }
  }

  render() {
    return (
      <Router >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/adicionar/funcionario" component={AdicionarUser} />
          <Route path="/adicionar/skill" component={Adicionar_Competencia} />
          <Route path="/adicionar/categoria" component={Adicionar_Categoria} />
          <Route path="/adicionar/habilitacao" component={Adicionar_Habilitacao} />
          <Route path="/adicionar/projeto" component={Adicionar_Projeto} />
          <Route path="/adicionar/interesse" component={Adicionar_Interesse} />
          <Route path="/lista/skills" component={Lista_Competencias} />
          <Route path="/lista/projetos" component={Lista_Projetos} />
          <Route path="/lista/interesses" component={Lista_Interesses} />
          <Route path="/lista/teamlead" component={Lista_TeamLead} />
          <Route path="/lista/developers" component={Lista_Developer} />
          <Route path="/interesse/:id" component={Interesse} />
          <Route path="/skill/:id" component={Skill} />
          <Route path="/projeto/:id" component={Projeto} />
          <Route path="/lista/allprojetos" component={TodosProjetos} />
          <Route path="/editar/skill/:id" component={EditarSkill} />
          <Route path="/user/:id" component={View_Funcionario} />
          <Route path="/editar/user/:id" component={EditarUser} />
          <Route path="/criarequipa" component={Criar_Equipa} />
          <Route path="/equipacriada/:id" component={EquipaCriada} />
          <Route path="/social" component={Social} />
        </Switch>
      </Router>
    )
  }
}
