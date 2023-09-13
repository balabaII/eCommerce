import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";

import UserSignUpForm from "./UserSignUpForm";
import UserLogInForm from "./UserLogInForm";

import styles from '../../styles/User.module.css';


const UserForm = () =>{
    const { showForm, formType } = useSelector( ( {user} ) => user ),
        dispatch = useDispatch();

    return(
        showForm ? ( 
                <>
                    <div className={styles.overlay} onClick={ () => dispatch( toggleForm(false) ) }/>
                    { formType === 'signup'? <UserSignUpForm/> : <UserLogInForm/>}
                    
                </>
                ) 
                : null
    );
};

export default UserForm;