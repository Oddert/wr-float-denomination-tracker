import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import { authUsersWriteAll, repositoriesWriteAll, authPartnersWriteAll } from '../actions'

import PageWrapper from './PageWrapper'
import Login from './Login'
import Dashboard from './Dashboard/'
import Counts from './Counts/'
import Count from './Count/'
import InspectOneRepo from './InspectOneRepo/'

import './Carbon.css'
import './Carbon-alterations.css'
import './ReactDatetime.css'
import './App.scss'

import 'react-datepicker/dist/react-datepicker.css'
import VisTest1 from './VisTest1'

const App: React.FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		function initialiseApp () {
			dispatch(authPartnersWriteAll())
			dispatch(repositoriesWriteAll())
			dispatch(authUsersWriteAll())
		}
		initialiseApp()
		// eslint-disable-next-line
	}, [])

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route 
						path='/login' 
						element={<Login />} 
					/>
          <Route 
						path='/home' 
						element={
							<>
								<PageWrapper>
								</PageWrapper>
							</>
						}
					/>            
          <Route 
						path='/counts' 
						element={
							<PageWrapper title='All Counts'>
								<Counts />
							</PageWrapper>
						} 
					/>
          <Route 
						path='/count/new' 
						element={
							<PageWrapper title='Add Count'>
								<Count />
							</PageWrapper>
						}
					/>
          <Route 
						path='/count/:id'
						element={
							<PageWrapper title='Edit Count'>
								<Count edit={true} />
							</PageWrapper>
						}
					/>
          <Route 
						path='/repositories'
						element={
							<PageWrapper title='All Repositories'>
								<Dashboard />
							</PageWrapper>
						}
					/>
          <Route 
						path='/repo/:id'
						element={
							<PageWrapper title='All Repositories'>
								<InspectOneRepo />
							</PageWrapper>
						}
					/>
          <Route 
						path='/vistest1'
						element={
							<PageWrapper title='Visualisation Test 1'>
								<VisTest1 />
							</PageWrapper>
						}
					/>
          <Route 
						path='/' 
						element={<Navigate to='/repositories' />}
					/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App