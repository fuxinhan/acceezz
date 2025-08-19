import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Style from "./index.module.css"
import HeaderCompoment from "../Compoment/Header";
import HomePage from "../Page/Home";
import FooterCompoment from "../Compoment/Footer";
import {  Layout } from "antd";
import { Content } from 'antd/es/layout/layout';

const HighlightsPage = lazy(()=>import('../Page/Highlights'))
const NotPage = lazy(()=>import('../Compoment/NotPage'))
const MembershipPage = lazy(()=>import('../Page/Membership'))
const AboutPage = lazy(()=>import('../Page/About'))
const LoginPage = lazy(()=>import('../Page/Login'))

function AppRouter (){
    return(
        <Layout className={Style.AppRouter}>
            <HeaderCompoment/>
            <Content className={Style.RouterCentent}>
                <Routes>
                    <Route exact  path='/' element={<HomePage/>} />
                    <Route   path='/Highlights' element={<HighlightsPage />} />
                    <Route path='/Membership' element={<MembershipPage />}/>
                    <Route path='/About' element={<AboutPage />} />
                    <Route path='/Login' element={<LoginPage />} />
                    <Route path='*' element={<NotPage />} />
                </Routes>
            </Content>
            
            <FooterCompoment />
        </Layout>
    )
}

export default AppRouter