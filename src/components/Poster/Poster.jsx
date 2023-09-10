
import styles from '../../styles/Home.module.css';
import backgroundPic from '../../images/computer.png';

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>BIG SALE 20%</div>

            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>the best seller of 20203</div>
                    <h1 className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</h1>
                    <button className={styles.button}>shop now</button>
                </div>

                <div className={styles.image}>
                <img src={backgroundPic} alt="Laptop" />
            </div>

            </div>
            
        </section>
    )
};

export default Poster;