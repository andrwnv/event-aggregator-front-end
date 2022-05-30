import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RegistrationConfirmPage from './pages/RegistrationPage/RegistrationConfirmPage/RegistrationConfirmPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import MainPage from './pages/MainPage/MainPage';
import AuthenticatedRoute from './components/custom-roures/AuthenticatedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css'
import 'rsuite/styles/index.less';
import SignInPage from './pages/SignInPage/SignInPage';
import { AuthProvider } from './hooks/useAuth';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path='*' element={<NotFoundPage/>}/>
                        {/*<Route path='explore' element={<AuthenticatedRoute/>}>*/}
                        {/*    <Route path='' element={<ExplorePage/>}/>*/}
                        {/*</Route>*/}
                        <Route path='explore' element={<ExplorePage/>}/>
                        <Route path='sign_in' element={<SignInPage/>}/>
                        <Route path='sign_up'>
                            <Route path='confirmed' element={<RegistrationConfirmPage/>}/>
                            <Route path='' element={<RegistrationPage/>}/>
                        </Route>
                        <Route path='' element={<MainPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
