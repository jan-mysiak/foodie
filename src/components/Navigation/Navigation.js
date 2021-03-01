import { useLayoutEffect, useEffect } from 'react'
import { setFormActive, setMenuActive, setSearchActive } from '../../store/actions/uiActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ActionIcon from './ActionIcon';
import MenuToggle from './MenuToggle';
import NavMenu from './NavMenu';
import styles from './Navigation.module.css';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import { setUserId } from '../../store/actions';

const LINKS = {
    "/groceries": "Inköpslista",
    "/products": "Produkter",
    "/categories": "Kategorier"
}

export default function Navigation() {
    const { menuActive, searchActive, formActive } = useSelector(s => s.ui);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // When user navigates
    useLayoutEffect(() => {
        dispatch(setSearchActive(false));
        dispatch(setFormActive(false));

        // Delay before menu closes to allow icons to reset
        setTimeout(() => {
            dispatch(setMenuActive(false));
        }, 300)
    }, [location, dispatch]);

    // Redirect if user disconnects
    useEffect(() => {
        if (!userId && location.pathname !== "/") {
            history.push("/");
        }
    }, [userId, location.pathname, history]);

    const toggleSearch = () => dispatch(setSearchActive(!searchActive));
    const toggleForm = () => dispatch(setFormActive(!formActive));
    const toggleMenu = () => dispatch(setMenuActive(!menuActive));
    const signOut = () => dispatch(setUserId(""));

    return (
        <>
            <div className={location.pathname === "/" ? styles.topnav_hidden : styles.topnav}>

                {/* TOGGLE */}
                <MenuToggle
                    isActive={menuActive}
                    onClick={toggleMenu}
                    currentPage={LINKS[location.pathname]}
                />

                {/* ACTIONS */}
                <div className={menuActive ? styles.actions_hidden : styles.actions}>
                    <ActionIcon
                        icon={FaSearch}
                        onClick={toggleSearch}
                        isActive={searchActive}
                    />
                    <ActionIcon
                        icon={FaPlusCircle}
                        onClick={toggleForm}
                        isActive={formActive}
                    />
                </div>
            </div>

            {/* MENU */}
            <NavMenu
                items={LINKS}
                isActive={menuActive}
                currentLocation={location.pathname}
                signOut={signOut}
            />
        </>
    )
}
