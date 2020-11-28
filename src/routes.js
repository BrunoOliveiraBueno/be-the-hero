import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Register from './pages/Register';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Aulas from './pages/Aula';
import AulaQuestoes from './pages/AulaQuestoes';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Logon}/>
      <Route path="/register" component={Register}/>

      <Route path="/profile" component={Profile}/>
      <Route path="/incidents/new" component={NewIncident}/>

      <Route path="/aula/:id" exact component={Aulas}/>
      <Route path="/aula/questoes/:id" component={AulaQuestoes}/>

      </Switch>
      </BrowserRouter>
  );
}