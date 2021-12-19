import clsx from "clsx";
import { useState } from "react";
import { connect } from "react-redux";
import styles from "./post.module.css";
import Layer from "../layer/Layer";
import { deletePost } from "../../redux/actions/postAction";

function ModalDeletePost({ deletePost, post_id }) {
    const [modalDelete, setModalDelete] = useState(false);
    const toggleModalDelete = () => {
        setModalDelete((prev) => !prev);
    };

    const handleDeletePost = (e) => {
        deletePost(post_id);
        toggleModalDelete();
    };
    return (
        <>
            <span onClick={toggleModalDelete}> Delete</span>
            {modalDelete && (
                <>
                    <Layer handleToggleModal={toggleModalDelete} />
                    <div className={styles.modalDeletePost}>
                        <div className={styles.modalHeader}>Delete Post</div>
                        <div className={styles.modalContent}>
                            Are you sure want to delete this post
                        </div>
                        <div
                            className={clsx(
                                styles.modalFooterDelete,
                                styles.modalFooter
                            )}
                        >
                            <button onClick={toggleModalDelete}>Cancel</button>
                            <button onClick={handleDeletePost}>Delete</button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (post_id) => {
            dispatch(deletePost(post_id));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalDeletePost);
