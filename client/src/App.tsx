import React from 'react'
import './App.css'
import { Router, Switch } from 'react-router'
import { useHistory } from 'react-router-dom'

const App: React.FC = () => {
  const history = useHistory()
  
  return (
    <Router history={history}>
      <div className="App">
        &lt;
        Side Menu
        &gt;
        <br/>
        &lt;
        Header
        &gt;
        <Switch>
          
        </Switch>
      </div>
    </Router>
  )
}

export default App