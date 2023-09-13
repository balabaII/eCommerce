import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { useGetProductsQuery } from "../../features/API/apiSlice";

import styles from '../../styles/Category.module.css';
import Products from "../Products/Products";



const Category = () => {
    const { id } = useParams(),
          { list } = useSelector( ({ categories} ) => categories )

    const defaultValues = {
        title: '',
        price_min : 0,
        price_max : 0,
    }

    const defaultParams = {
        ...defaultValues,
        limit : 10,
        offset : 0,
        categoryId : id,
    };

    const [params, setParams] = useState(defaultParams),
          [values, setValues] = useState(defaultValues),
          [category, setCategory] = useState(null),
          [items, setItems] = useState([]),
          [limit, setLimit] = useState(false);

    const { data, isLoading, isSuccess } = useGetProductsQuery( params );

    useEffect( () => {
        if( !id ) return;
        
        setValues(defaultValues);
        setItems([]);
        setLimit(false);
        setParams( {...defaultParams, categoryId : id} )
    }, [id]);

    useEffect( () => {
        if( !id || !list.length ) return;

        const cat = list.find( item => item.id === id * 1 )
        setCategory( cat );
    },[list, id]);

    useEffect( () => {
        if( isLoading ) return;

        if( !data.length ) return setLimit( true );

        const products = Object.values(data);

        if( !products.length) return;

        setItems( (_items) => [..._items, ...products])

    }, [data, isLoading] );

    

    const handleChange = ( {target : {value, name} } ) =>{
        setValues( {...values, [name] : value } );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([]);
        setLimit( false );
        setParams( {...defaultParams, ...values} );
    }

    
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{category?.name}</h2>

            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input type="text" 
                            name="title" 
                            onChange={handleChange} 
                            placeholder="Product name"
                            value={values.title}/>
                </div>

                <div className={styles.filter}>
                    <input type="number" 
                            name="price_min" 
                            onChange={handleChange} 
                            placeholder="0"
                            value={values.price_min}/>
                    <span>Min Price</span>
                </div>

                <div className={styles.filter}>
                    <input type="number" 
                            name="price_max" 
                            onChange={handleChange} 
                            placeholder="0"
                            value={values.price_max}/>
                    <span>Max Price</span>
                </div>

                <button type="submit" hidden />
            </form>

            {isLoading ? <div className="preloader">Loading...</div>
                        :  !isSuccess || !items.length ? (<div className={styles.back}>
                                                            <span>No Results</span>
                                                            <button>Reset</button>
                                                        </div>) 
                                                      : <Products title="" 
                                                                  products={items} 
                                                                  style={ {padding : 0} } 
                                                                  amount={items.length}
                                                                  />}
        {!limit && <div className={styles.more}>
                        <button onClick={() => setParams( {...params, offset : params.offset + params.limit} )}>See more</button>
                   </div>}
        
        </section>
    )
};

export default Category;