import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RegistrationConfirmPage from './pages/RegistrationPage/RegistrationConfirmPage/RegistrationConfirmPage'
import AuthenticatedRoute from './components/custom-roures/AuthenticatedRoute'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignInPage from './pages/SignInPage/SignInPage'
import MainPage from './pages/MainPage/MainPage'

import { AuthProvider } from './hooks/useAuth'

import 'rsuite/styles/index.less'
import './App.css'

function App() {
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
