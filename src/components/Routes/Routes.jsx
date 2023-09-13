import { Route, Routes } from "react-router";

import {ROUTES} from '../../utils/routes.js';

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import Profile from "../Profile/Profile.jsx";
import SingleCategory from "../Categories/SingleCategory.jsx";

const AppRoutes = () =>{
    return (
        <Routes>
            <Route index element ={<Home/>} />
            <Route path={ROUTES.PRODUCT} element={<SingleProduct/>} />
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
            <Route path={ROUTES.CATEGORY} element={<SingleCategory/>} />

        </Routes>
    )
};

export default AppRoutes;