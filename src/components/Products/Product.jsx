import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItemToCart } from '../../features/user/userSlice.js';
import { ROUTES } from '../../utils/routes.js';

import styles from '../../styles/Product.module.css';



const colors = ['Green', 'Yellow', 'Red', 'Orange', 'Black'],
    sizes = [5, 5.5, 6];


const Product = (item) =>{
    const {title, price, description, images} = item;
    const [currentImage, setCurrentImage] = useState(),
        [currentSize, setCurrentSize] = useState();
    
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch( addItemToCart(item) )
    };

    useEffect( () => {
        if(  !images.length ) return
        setCurrentImage( images[0] );
    }, [item] );

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current} style={{ backgroundImage: `url(${currentImage})`}} />
                <div className={ styles["images-list"] }>
                {images.map( (image, index) => (
                    <div key={index}   
                        className={styles.image} 
                        style={{ backgroundImage: `url(${image})`}} 
                        onClick={() => {setCurrentImage( image )}}
                        />
                ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>
                <div className={styles.color}>
                    <span>Color:</span> {colors[Math.floor( Math.random() * colors.length )]}
                </div>
                <div className={styles.size}>
                    <span>Sizes: </span>
                    <div className={styles.list}>
                        {sizes.map( (size, index) => (
                            <div key={index} 
                                onClick={() => {setCurrentSize(size)}} 
                                className={`${styles.size} ${currentSize === size ? styles.active : null}` }>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.description}>{description}</p>

                <div className={styles.actions}>
                    <button onClick={addToCart} className={styles.add} disabled={!currentSize}>Add to cart</button>
                    <button className={styles.favourite}>Add to favourites</button>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.purchase}>248 people have purchased it</div>

                    <Link to={ROUTES.HOME}> Return to store </Link>
                </div>


            </div>
        </section> 
    )
};

export default Product