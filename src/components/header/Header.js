import { useState } from "react";
import { Link } from 'react-router-dom'
import styles from "./header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/constants";
import { TOKEN_NAME } from "../../credentials";
const Header = () => {
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleLogout = () => {
        localStorage.removeItem(TOKEN_NAME)
        dispatch({ type: GLOBAL_TYPES.AUTH, payload: { user: null, isAuthenticated: false } })
    }
    return (
        <header className={styles.Header}>
            <Link to="/" className={styles.headerLogo}>VinhTieng</Link>
            <div className={styles.headerSearch}>
                <button>
                    <ion-icon name="search-outline"></ion-icon>
                </button>
                <input
                    type="text"
                    id="search"
                    value={search}
                    placeholder="Search..."
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <ul className={styles.headerMenu}>
                {/* <li className={styles.headerMenuItem}>
                    <a href="/">
                        <ion-icon name="logo-wechat"></ion-icon>
                    </a>
                </li> */}
                <li className={styles.headerMenuItem}>
                    <a href="/" className="avatar-sm">
                        <img
                            src={auth.user.image}
                            alt=""
                        />
                    </a>
                </li>
                <li
                    className={styles.headerMenuItem}
                    onClick={() => setDropdown(!dropdown)}
                >
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </li>
                {dropdown && (
                    <ul className={styles.dropDownMenu}>
                        <li>
                            <Link to={`/user/${auth.user.slug}`}>
                                <ion-icon name="person-circle-sharp"></ion-icon>
                                My profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <ion-icon name="settings-sharp"></ion-icon>{" "}
                                Setting
                            </Link>
                        </li>
                        <hr />
                        <li className={styles.btnLogout} onClick={handleLogout}>
                            <div >Logout</div>
                        </li>
                    </ul>
                )}
            </ul>
        </header>
    );
};

export default Header;
