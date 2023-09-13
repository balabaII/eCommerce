import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser  } from '../../features/user/userSlice';

import styles from '../../styles/Profile.module.css';


const Profile = () =>{
    const {currentUser} = useSelector( state => state.user),
          dispatch = useDispatch();

    const [values, setValues] = useState({
        name: '',
        email : '',
        password : '',
        avatar : '',
    });

    useEffect( () => {
        if( currentUser) setValues( currentUser)
    }, [currentUser] );
    

    const handleChange = ( { target: {value, name} } ) =>{
        setValues( {...values, [name]: value } );
    };
    

    const handleSubmit = (e) =>{
        e.preventDefault();

        const isEmpty = Object.values( values ).some( value => !value );

        if(!isEmpty){
            dispatch( updateUser(values) );
        }
    };

    return (
        <section className={styles.profile}>
            {currentUser ? (    
            <form className={styles.form} onSubmit={handleSubmit} >
                <div className={styles.group}>
                    <input  type="email" 
                            name='email' 
                            onChange={handleChange} 
                            placeholder='New email' 
                            value={values.email}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="name" 
                            name='name' 
                            onChange={handleChange} 
                            placeholder='New name' 
                            value={values.name}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="password" 
                            name='password' 
                            onChange={handleChange} 
                            placeholder='New password' 
                            value={values.password}
                            autoComplete='off' 
                            required/>
                </div>

                <div className={styles.group}>
                    <input  type="avatar" 
                            name='avatar' 
                            onChange={handleChange} 
                            placeholder='New avatar' 
                            value={values.avatar}
                            autoComplete='off' 
                            required/>
                </div>

                <button type='submit' className={styles.submit}>Update an account</button>
            </form>
            ) : <span> You gotta log in first, dummy</span> }
        </section>
    )
}

export default Profile;