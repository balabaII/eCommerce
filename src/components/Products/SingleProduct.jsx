import { useEffect } from "react";
import { useGetProductQuery } from "../../features/API/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {ROUTES} from '../../utils/routes.js'
import { getRelatedProducts } from "../../features/products/productsSlice";

import Product from "./Product";
import Products from "./Products";



const SingleProduct = () =>{
    const { id } = useParams(),
        navigate = useNavigate(),
        dispatch = useDispatch();

    const { data, isLoading, isFetching, isSuccess} = useGetProductQuery({id}),
        {list, related} = useSelector( ({products}) => products);

    useEffect( () => {
        if( !isFetching && !isLoading && !isSuccess){
            navigate(ROUTES.HOME)
        };
    }, [isLoading, isFetching, isSuccess] );

    useEffect( () => {
        if( !data || !list.length ) return;
        dispatch( getRelatedProducts(data.category.id) )
    }, [data, dispatch, list.length] );

    return (
        !data ? <section className="preloader">Loading...</section>
        :(
            <>  
            <Product {...data}/>
            <Products products={related} amount={5} title="Related products"/>
            </>
        ) 
    )
}

export default SingleProduct;