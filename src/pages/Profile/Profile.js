import { useEffect } from "react";
import styles from "./profile.module.css";
import PostList from "../../components/post/PostList";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getPostAndUser } from "../../redux/actions/profileUserAction";
import ModalEditProfile from "./ModalEditProfile";

function Profile({ getPostAndUser }) {
    const params = useParams();
    const { auth, profile_user } = useSelector((state) => state);
    let page = 0;
    let slug = params.slug;

    useEffect(() => {
        getPostAndUser(slug, page);
    }, [slug, getPostAndUser, page]);

    let isMe = false;
    if (auth?.user?.slug === slug) isMe = true;

    return (
        <>
            <Header />
            <div className={styles.profile}>
                {auth.user?._id && (
                    <div className={styles.profileheader}>
                        <div className="avatar-lg">
                            <img src={auth.user.image} alt="Avatar of user" />
                        </div>
                        <div className={styles.profileUserData}>
                            <div className={styles.userName}>
                                {auth.user.name}
                            </div>
                            <div className={styles.slogan}>
                                {auth.user.introduction}
                            </div>
                            <div className={styles.email}>
                                Email: {auth.user.email}
                            </div>
                            {isMe && <ModalEditProfile />}
                        </div>
                    </div>
                )}
                <PostList posts={profile_user.posts} page="profile" />
            </div>
        </>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPostAndUser: (slug, page) => {
            dispatch(getPostAndUser(slug, page));
        },
    };
};
export default connect(null, mapDispatchToProps)(Profile);
