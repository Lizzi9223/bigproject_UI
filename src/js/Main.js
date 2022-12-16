import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Profile from './Profile';
import Dashboard from './dashboard/Dashboard';
import SingleTask from './dashboard/SingleTask';
import Projects from './Projects';
import Orders from './Orders';
import Users from './Users';
import ProjectPage from './ProjectPage';
import CreateProject from './CreateProject';
import CreateTask from './dashboard/CreateTask';
import jwt_decode from "jwt-decode";

export default function Main(){
    const navigate = useNavigate();
    const [cookies] = useCookies(["token", "employeeId", "projectId"]);
    const[decodedToken, setDecodedToken] = useState({});

    useEffect(() => {        
        setDecodedToken(jwt_decode(cookies.token))
    }, []);

    return(
        <div className="main">
            <Sidebar navigate={navigate} />
            <Routes>                  
                <Route path="/*" element={<Navigate to={decodedToken.role!=="ROLE_CUSTOMER" 
                                                        ? "profile/" +  cookies.employeeId
                                                        : "dashboard/" + cookies.projectId} />} />
                <Route path="profile/:id" element={<Profile navigate={navigate}  /> } />
                <Route path="dashboard/:id" element={<Dashboard navigate={navigate}  /> } />
                <Route exact path="ticket/:id" element={<SingleTask navigate={navigate}  /> } />
                <Route exact path="ticket/new" element={<CreateTask navigate={navigate}  /> } />
                <Route path="projects" element={<Projects navigate={navigate}  /> } />
                <Route path="orders" element={<Orders navigate={navigate}  /> } />
                <Route path="users" element={<Users navigate={navigate}  /> } />
                <Route path="project/:id" element={<ProjectPage navigate={navigate}  /> } />
                <Route path="orders/:id/create" element={<CreateProject navigate={navigate}  /> } />
            </Routes> 
        </div>               
    );
}
