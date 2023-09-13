import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUser, toggleForm, toggleFormType } from '../../features/user/userSlice';

import styles from '../../styles/User.module.css';
import sprites from '../../logos/sprite.svg';




const UserSignUpForm = () =>{
    const [values, setValues] = useState({
        name: '',
        email: '',
        password:'',
        avatar:'',
    }),
    dispatch = useDispatch();

    const handleChange = ( { target : {value, name} } ) =>{
        setValues({...values, [name]: value })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const isEmpty = Object.values( values ).some( value => !value );

        if(!isEmpty){
            dispatch( createUser(values) );
            dispatch( toggleForm( false) );
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.close}>
                <svg className='icon' onClick={ () => dispatch( toggleForm(false) ) } >
                    <use xlinkHref={`${sprites}#close`} />
                </svg>
            </div>

            <div className={styles.title}>Sign Up</div>
            
            <form className={styles.form} onSubmit={handleSubmit} >
                <div className={styles.group}>
                    <input  type="email" 
                            name='email' 
                            onChange={handleChange} 
                            placeholder='Your email' 
                            value={values.email}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="name" 
                            name='name' 
                            onChange={handleChange} 
                            placeholder='Your name' 
                            value={values.name}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="password" 
                            name='password' 
                            onChange={handleChange} 
                            placeholder='Your password' 
                            value={values.password}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="avatar" 
                            name='avatar' 
                            onChange={handleChange} 
                            placeholder='Your avatar' 
                            value={values.avatar}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.link} onClick={() => dispatch(toggleFormType('signin'))}>I already have an account</div>
                <button type='submit' className={styles.submit}>Create an account</button>
            </form>
        </div>
    )
}

export default UserSignUpForm;