import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {ROUTES} from '../../utils/routes.js';
import { toggleForm } from '../../features/user/userSlice.js';

import styles from '../../styles/Header.module.css';
import logo from '../../images/logo.svg';
import sprites from '../../logos/sprite.svg';
import avatar from '../../images/avatar.jpg';



const Header = () =>{
    const {currentUser, showForm} = useSelector( ( {user} ) => user ),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        [values, setValues] = useState({name: "Guest", avatar});

    const handleClick = () =>{
        if( !currentUser) dispatch( toggleForm(true) );
        else navigate(ROUTES.PROFILE)
    };
    
    useEffect( () => {
        if( currentUser) setValues( currentUser);
    }, [currentUser] );
    
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className={styles.info} >

                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${values.avatar})`}} />
                    <div className={styles.username}>{values.name}</div>
                </div>
                

                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className='icon'>
                            <use xlinkHref={`${sprites}#search`}/>
                        </svg>
                    </div>

                    <div className={styles.input}>
                    <input 
                        type="search" 
                        name='search' 
                        placeholder='Search' 
                        autoComplete='off'
                        value=""
                        onChange={() => {}}
                        />
                    </div>  
                    {false && <div className={styles.box}></div> }
                    
                </form>

                <div className={styles.account}> 
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <svg className={styles["icon-fav"]}>
                            <use xlinkHref={`${sprites}#heart`}/>
                        </svg>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className={styles["icon-cart"]}>
                            <use xlinkHref={`${sprites}#bag`}/>
                        </svg>
                        <span className={styles.count}>2</span>
                    </Link>
                    
                </div>
                
            </div>
        </div>
    )
};

export default Header;