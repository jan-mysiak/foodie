import { Link } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import styles from './Login.module.css';
import { FaUser, FaLinkedinIn, FaGithub, FaEnvelope, FaCheck } from 'react-icons/fa';
import { TextInput } from '../_shared/Inputs/';
import { FlexRow, InlineButton, InlineIcon } from '../_shared/Layout/';

export default function Login(props) {
    const { onLogin, onAnonymousLogin, userName, nameError } = useLogin(props.history);

    return (
        <div className={styles.login}>
            {/* HEADER */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Inköpslistan
                </h1>
                <p className={styles.subTitle}>
                    En enkel matapp med ungefär två användare
                </p>
            </div>

            {/* CONTENT */}
            <div className={styles.content}>
                {/* LOGIN FORM */}
                <form className={styles.loginForm} onSubmit={onLogin}>
                    <label className={styles.label}>Fyll i ditt användarnamn</label>
                    <FlexRow>
                        <InlineIcon
                            icon={FaUser}
                            hasError={userName.error || nameError}
                            isActive={userName.value}
                        />
                        <TextInput {...userName} placeholder="Användarnamn.." />
                        <InlineButton icon={FaCheck} />
                    </FlexRow>
                </form>

                {/* ANONYMOUS BUTTON */}
                <label className={styles.label}>Eller utforska appen</label>
                <button className={styles.anonymousBtn} onClick={onAnonymousLogin}>
                    Fortsätt utan att logga in
                </button>
            </div>

            {/* FOOTER */}
            <div className={styles.footer}>
                <small>by Jan Mysiak</small>

                <div className={styles.socialIcons}>
                    <FaLinkedinIn size="24" />
                    <FaGithub size="24" />
                    <FaEnvelope size="24" />
                </div>
            </div>
        </div>
    )
}
