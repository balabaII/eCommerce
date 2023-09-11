import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../features/API/apiSlice";
import { useEffect } from "react";

import {ROUTES} from '../../utils/routes.js'

import Product from "./Product";


const SingleProduct = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isFetching, isSuccess} = useGetProductQuery({id});

    useEffect( () => {
        if( !isFetching && !isLoading && !isSuccess){
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess])

    return (
        !data ? <section className="preloader">Loading...</section>
        : <Product {...data}/>
    )
}

export default SingleProduct;