import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RegistrationConfirmPage from './pages/RegistrationPage/RegistrationConfirmPage/RegistrationConfirmPage'
import AuthenticatedRoute from './components/custom-roures/AuthenticatedRoute'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import HistoryListPage from './pages/HistoryListPage/HistoryListPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ObjectPage from './pages/ObjectPage/ObjectPage'
import SignInPage from './pages/SignInPage/SignInPage'
import MainPage from './pages/MainPage/MainPage'

import { AuthProvider } from './hooks/useAuth'
import { ObjectType } from './api/const'

import 'rsuite/styles/index.less'
import './App.css'


const App: React.FC<any> = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='*' element={<NotFoundPage />} />
                        <Route path='profile/me'
                               element={
                                   <AuthenticatedRoute>
                                       <ProfilePage />
                                   </AuthenticatedRoute>
                               }
                        />
                        <Route path='/event/:id' element={<ObjectPage type={ObjectType.EVENT} />}/>
                        <Route path='/place/:id' element={<ObjectPage type={ObjectType.PLACE} />}/>

                        <Route path='/histories/:id' element={<HistoryPage />} />
                        <Route path='/histories' element={<HistoryListPage />} />

                        <Route path='explore' element={<ExplorePage />} />

                        <Route path='sign_in' element={<SignInPage />} />
                        <Route path='sign_up'>
                            <Route path='confirmed' element={<RegistrationConfirmPage />} />
                            <Route path='' element={<RegistrationPage />} />
                        </Route>
                        <Route path='' element={<MainPage />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
