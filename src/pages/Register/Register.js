import { useState } from "react";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userRegister } from "../../redux/actions/authAction";
import showToast from "../../utils/showToast";
function Register(props) {
    let [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        fullname: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const resestInput = () => {
        setUser({
            username: "",
            password: "",
            confirmPassword: "",
            fullname: "",
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.username === "") {
            showToast("error", "Username empty");
            return;
        }
        if (user.username === "") {
            showToast("error", "Username empty");
            return;
        }
        if (user.password === "" || user.password.length < 6) {
            showToast("error", "Password need more than 6 character");
            return;
        }
        if (user.password !== user.confirmPassword) {
            showToast("error", "Confirm password not matched");
            return;
        }
        if (user.fullname === "") {
            showToast("error", "Name can not be empty");
            return;
        }
        let data = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
        };
        props.userRegister(data);
        resestInput()
    };
    return (
        <div className={styles.Login}>
            <div className={styles.loginHeader}>VinhTieng</div>
            <form
                action=""
                onSubmit={handleSubmit}
                className={styles.form}
                encType="multipart/form-data"
            >
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        name="password"
                        autoComplete="password"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={user.confirmPassword}
                        name="confirmPassword"
                        autoComplete="confirm-password"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Full name"
                        value={user.fullname}
                        name="fullname"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <button>Register</button>
                </div>
            </form>
            OR
            <div className={styles.redirect}>
                You have an account?
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        userRegister: (user) => {
            dispatch(userRegister(user));
        },
    };
};
export default connect(null, mapDispatchToProps)(Register);
