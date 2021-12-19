import { useState } from "react";
import { connect } from 'react-redux'
import styles from "./comment.module.css";
import Layer from "../../layer/Layer";
import { deleteComment } from '../../../redux/actions/postAction'
import clsx from "clsx";

function ModalDeleteComment({ comment, deleteComment, handleToggle, post_id }) {
    const [modalDelete, setModalDelete] = useState(false);
    const toggleModalDelete = () => {
        setModalDelete((prev) => !prev);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = { post_id: post_id, comment_id: comment._id }
        deleteComment(data)
        toggleModalDelete()
        handleToggle()
    }

    return (
        <>
            <span onClick={toggleModalDelete}>Delete</span>
            {modalDelete && (
                <>
                    <Layer handleToggleModal={toggleModalDelete} />
                    <div className={styles.modalDelete}>
                        {/* <form action="" onSubmit={handleSubmit}> */}
                        <div className={styles.modalHeader}>
                            Delete comment?
                            <ion-icon name="close" onClick={toggleModalDelete}></ion-icon>
                        </div>
                        <div className={styles.modalContent}>
                            Are you sure want to delete this comment?
                        </div>
                        <div className={clsx(styles.modalFooter, styles.modalFooterDelete)}>
                            <button onClick={toggleModalDelete}>Cancel</button>
                            <button onClick={handleSubmit}>Delete</button>
                        </div>
                        {/* </form> */}
                    </div>
                </>
            )}
        </>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (data) => {
            dispatch(deleteComment(data));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalDeleteComment);
