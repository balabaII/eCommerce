import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';


const Sidebar = () =>{
    const { list, categoriesLoadingStatus} = useSelector( ({categories}) => categories )
    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    {list.map( ({id, name}) => (
                        <li key={id}>
                            <NavLink 
                                className={ ({isActive}) => `${styles.link} ${isActive ? styles.active : null}`}
                                to={`/categories/${id}`}>
                                {name}
                            </NavLink>
                        </li>
                        ) 
                    )}
                </ul>
            </nav>

            <div className={styles.footer}>
                <a href='#' target='_blank' className={styles.link}>Help</a>
                <a href='#' target='_blank' className={styles.link} style={{textDecoration: 'underline'}}>Terms & Conditions</a>
            </div>
        </section>
    )
};

export default Sidebar;