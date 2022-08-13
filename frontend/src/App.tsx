// import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'
import Landing from './pages/landing'
import Home from './pages/home'
import Contact from './pages/contact'
import Layout from './layout/layout'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
