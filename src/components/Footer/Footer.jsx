import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes.js';

import logo from '../../images/logo.svg';
import sprites from '../../logos/sprite.svg';
import styles from '../../styles/Footer.module.css';

const Footer = () =>{
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <div className={styles.rights}>
                <a target='_blank' href="https://github.com/balabaII">
                    Developed by Erbol Kulantaev aka erbolmongol, balaball
                </a>
            </div>

            <div className={styles.socials}>
                <a target='_blank' href="https://instagram.com">
                    <svg className='icon'>
                        <use xlinkHref={`${sprites}#instagram`}/>
                    </svg>
                </a>
                <a target='_blank' href="https://facebook.com">
                    <svg className='icon'>
                        <use xlinkHref={`${sprites}#facebook`}/>
                    </svg>
                </a>
                <a target='_blank' href="https://youtube.com">
                    <svg className='icon'>
                        <use xlinkHref={`${sprites}#youtube`}/>
                    </svg>
                </a>
            </div>
        </section>
    )
};

export default Footer;