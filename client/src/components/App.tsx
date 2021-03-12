import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './App.scss'

import PageWrapper from './PageWrapper'
import Login from './Login'
import Dashboard from './Dashboard'
import Counts from './Counts'

const App: React.FC = () => {  
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/home'>
            <PageWrapper>
						</PageWrapper>
          </Route>
          <Route path='/counts'>
            <PageWrapper title='Counts'>
							<Counts />
						</PageWrapper>
          </Route>
          <Route path='/'>
            <PageWrapper>
							<Dashboard />
						</PageWrapper>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App