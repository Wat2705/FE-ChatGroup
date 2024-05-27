import bgAuth from "@/assets/img/bg-auth.png";
import LogIn from "./LogIn";
import Register from "./Register";
import styles from "./auth.module.scss";

export default function Auth(props) {
    return (
        <div className={styles.authContainer}>
            <div className={styles.wrapperJax}>
                <div className={styles.contentAuthentication}>
                    <div className={styles.rowAuthentication}>
                        <div className={`col-0 ${styles.jsxLeftAuthentication}`}>
                            <div className={styles.contentLeft}>
                                <h3>Xin chào</h3>
                                <img src={bgAuth} alt="Bg" loading="lazy" />
                            </div>
                        </div>
                        {props.isLogIn ? <LogIn /> : <Register />}
                    </div>
                </div>
            </div>
        </div >
    );
}