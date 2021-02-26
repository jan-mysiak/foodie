import { Link } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import styles from './Login.module.css';
import { FaUser, FaLinkedinIn, FaGithub, FaEnvelope, FaCheck } from 'react-icons/fa';
import { TextInput } from '../_shared/Inputs/';
import { FlexRow, InlineButton, InlineIcon } from '../_shared/Layout/';

export default function Login(props) {
    const { onLogin, onAnonymousLogin, userName, userFound } = useLogin(props.history);

    const AnonymousButton = () => (
        <button className={styles.anonymousBtn}>
            <Link to="/groceries">
                Fortsätt utan att logga in
            </Link>
        </button>
    )

    return (
        <div className={styles.login}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Inköpslistan
                </h1>
                <p className={styles.subTitle}>
                    En enkel matapp med ungefär två användare
                </p>
            </div>


            <div className={styles.content}>
                <div className={styles.loginForm}>
                    <label className={styles.label}>Fyll i ditt användarnamn</label>
                    <FlexRow>
                        <InlineIcon icon={FaUser} isActive={userName.value} />
                        <TextInput {...userName} placeholder="Användarnamn.." />
                        <InlineButton icon={FaCheck} />
                    </FlexRow>
                </div>

                <label className={styles.label}>Eller utforska utan att behöva handla</label>
                <AnonymousButton />
            </div>

            <div className={styles.footer}>
                <small>Jan Mysiak</small>

                <div className={styles.socialIcons}>
                    <FaLinkedinIn size="24" />
                    <FaGithub size="24" />
                    <FaEnvelope size="24" />
                </div>
            </div>
        </div>
    )
}
