import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import clsx from "clsx";
import Layer from "../../components/layer/Layer";
import { connect, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/profileUserAction";

function ModalEditProfile({ updateUser }) {
    const [modalEdit, setModalEdit] = useState(false);
    const { auth } = useSelector((state) => state);
    const [user, setUser] = useState({
        name: auth.user?.name,
        email: auth.user?.email,
        introduction: auth.user?.introduction,
        avatar: undefined,
        previewAvatar: auth.user?.image,
    });
    const toggleModal = () => {
        setModalEdit((prev) => !prev);
    };
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        return () => {
            user.previewAvatar !== auth.user.image &&
                URL.revokeObjectURL(user.previewAvatar);
        };
    }, [user.previewAvatar, auth.user.image]);

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setUser({
            ...user,
            previewAvatar: file.preview,
            avatar: file,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        //if else
        updateUser(formData);
        toggleModal();
    };
    return (
        <>
            <button className={styles.buttonEditUser} onClick={toggleModal}>
                Edit
                <ion-icon name="pencil-outline"></ion-icon>
            </button>
            {modalEdit && (
                <>
                    <Layer handleToggleModal={toggleModal} />
                    <div className={styles.modalEditProfile}>
                        <form action="" onSubmit={handleSubmit}>
                            <div className={styles.modalHeader}>
                                Edit user profile
                                <ion-icon
                                    onClick={toggleModal}
                                    name="close-outline"
                                ></ion-icon>
                            </div>
                            <div className={styles.modalContent}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="">Display name</label>
                                    <input
                                        type="text"
                                        value={user.name}
                                        name="name"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        value={user.email}
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="">Introduction</label>
                                    <input
                                        type="text"
                                        value={user.introduction}
                                        name="introduction"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div
                                    className={clsx(
                                        styles.formGroup,
                                        styles.formFile
                                    )}
                                >
                                    <label htmlFor="image">Avatar</label> <br />
                                    <label
                                        className={styles.chooseFile}
                                        htmlFor="image"
                                    >
                                        ChooseFile
                                        <ion-icon name="image"></ion-icon>
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleChangeImage}
                                        id="image"
                                        name="image"
                                    />
                                </div>
                                <div
                                    className={clsx(
                                        styles.imagePreview,
                                        "avatar-md"
                                    )}
                                >
                                    <img src={user.previewAvatar} alt="" />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.btnSave}>Save</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data) => {
            dispatch(updateUser(data));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalEditProfile);
