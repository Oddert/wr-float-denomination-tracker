import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './App.scss'

import Dashboard from './Dashboard'
import Login from './Login'

const App: React.FC = () => {  
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/home'>
            <Dashboard />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App