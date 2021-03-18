import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import './Carbon.css'
import './Carbon-alterations.css'
import './ReactDatetime.css'
import './App.scss'

import PageWrapper from './PageWrapper'
import Login from './Login'
import Dashboard from './Dashboard'
import Counts from './Counts'
import Count from './Count/'

import 'react-datepicker/dist/react-datepicker.css'

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
          <Route path='/count/new'>
            <PageWrapper title='Add Count'>
							<Count />
						</PageWrapper>
          </Route>
          <Route path='/count/:id'>
            <PageWrapper title='Count'>
							<Count edit={true} />
						</PageWrapper>
          </Route>
          <Route path='/repositories'>
            <PageWrapper>
							<Dashboard />
						</PageWrapper>
          </Route>
          <Route path='/'>
            <Redirect to='/repositories' />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App