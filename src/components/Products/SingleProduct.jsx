import { useEffect } from "react";
import { useGetProductQuery } from "../../features/API/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {ROUTES} from '../../utils/routes.js'
import { getRelatedProducts, error } from "../../features/products/productsSlice";

import Product from "./Product";
import Products from "./Products";

import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorBoundary/ErrorMessage/ErrorMessage";



const SingleProduct = () =>{
    const { id } = useParams(),
        navigate = useNavigate(),
        dispatch = useDispatch();

    const { data, isLoading, isFetching, isSuccess} = useGetProductQuery({id}),
        {list, related, productsLoadingStatus} = useSelector( ({products}) => products);



    useEffect( () => {
        if( !data || !list.length ) {
            dispatch( error() )
            return 
        };
        dispatch( getRelatedProducts(data.category.id) )
    }, [data, dispatch, list.length] );

    const visibleContent = () =>{
        if( productsLoadingStatus === 'loading'){
            return <Spinner/>
        }else if( productsLoadingStatus === 'error'){
            return <ErrorMessage/>
        }else if( productsLoadingStatus === 'idle'){
            return (
                <>  
                <Product {...data}/>
                <Products products={related} amount={5} title="Related products"/>
               </>
            )
        }
    } 
    return (
        <>
        {visibleContent()}
        </>
        
        // !data ? <section className="preloader">Loading...</section>
        // :(
        //     
        // ) 
    )
}

export default SingleProduct;