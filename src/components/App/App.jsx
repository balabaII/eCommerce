import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchCategories } from "../../features/categories/categoriesSlice.js";
import { fetchProducts } from '../../features/products/productsSlice.js';

import AppRoutes from "../Routes/Routes";

import Header from "../Header/Header";
import UserForm from "../User/UserForm.jsx";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";




const App = () =>{
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( fetchCategories() );
        dispatch( fetchProducts() );
    }, []);

    
    return (
        <div className="app">
            <Header/>
            <UserForm/>
            <div className="container">
                <Sidebar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
    )
}

export default App;