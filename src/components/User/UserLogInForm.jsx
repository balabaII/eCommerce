import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUser, toggleForm, toggleFormType } from '../../features/user/userSlice';

import styles from '../../styles/User.module.css';
import sprites from '../../logos/sprite.svg';




const UserLogInForm = () =>{
    const [values, setValues] = useState({
        email: '',
        password:'',
    }),
    dispatch = useDispatch();

    const handleChange = ( { target : {value, name} } ) =>{
        setValues({...values, [name]: value })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const isEmpty = Object.values( values ).some( value => !value );

        if(!isEmpty){
            dispatch( loginUser(values) );
            dispatch( toggleForm( false) );
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.close}>
                <svg className='icon' onClick={ () => dispatch( toggleForm(false) ) } >
                    <use xlinkHref={`${sprites}#close`} />
                </svg>
            </div>

            <div className={styles.title}>Log In</div>
            
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
                    <input  type="password" 
                            name='password' 
                            onChange={handleChange} 
                            placeholder='Your password' 
                            value={values.password}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.link} onClick={() => dispatch( toggleFormType('signup') )} >Create an account</div>
                <button type='submit' className={styles.submit}>Log In</button>
            </form>
        </div>
    )
}

export default UserLogInForm;
