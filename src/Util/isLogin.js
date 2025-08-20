import React from "react";
import Utils from "./webCofig";
import LoginPage from "../Page/Login";
// import MLogin from "../MPage/MLogin";
// import PermissionPage from "../Page/Permission";
// import StudentHome from "../Page/Student/home";

export default function IsLogin(Component, permissions, permissions1) {
    let userInfo = localStorage.getItem('userInfo')

    if (userInfo === '[object Object]') {
        localStorage.clear();
        window.location.reload(true);
    }
    let user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) user = user.user_info.codes
    //已登陆
    if(Utils.getToken()) return <Component />
    return <LoginPage />
    // if (Utils.getToken()) {
    //     if (permissions === 'all') return <Component />
    //     if (user && user.length !== 0 && permissions) {
    //         if ((user.indexOf(permissions) !== -1) || (user.indexOf(permissions1) !== -1)) {
    //             return <Component />
    //         } else {
    //             return <PermissionPage />
    //         }
    //     } else {
    //         return <Component />
    //     }
    // } else {   // 未登录
    //     // return <LoginPage />
    //      return <StudentHome />
    // }
}