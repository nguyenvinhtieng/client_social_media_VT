import { useState } from "react";
import { connect } from 'react-redux'
import styles from "./comment.module.css";
import Layer from "../../layer/Layer";
import { editComment } from '../../../redux/actions/postAction'

function ModalEditComment({ comment, handleToggle, post_id, editComment }) {
    const [modalEdit, setModalEdit] = useState(false);
    const [content, setContent] = useState(comment.content)
    const toggleModalEdit = () => {
        setModalEdit((prev) => !prev);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = { post_id: post_id, comment_id: comment._id, content: content }
        editComment(data)
        toggleModalEdit()
        handleToggle()
    }
    const handleChange = (e) => {
        setContent(e.target.value)

    }

    return (
        <>
            <span onClick={toggleModalEdit}>Edit</span>
            {modalEdit && (
                <>
                    <Layer handleToggleModal={toggleModalEdit} />
                    <div className={styles.modalEdit}>
                        <form action="" onSubmit={handleSubmit}>
                            <div className={styles.modalHeader}>
                                Edit comment
                                <ion-icon name="close" onClick={toggleModalEdit}></ion-icon>
                            </div>
                            <div className={styles.modalContent}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="">Content</label>
                                    <input type="text" value={content} onChange={handleChange} />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button>Save</button>
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
        editComment: (data) => {
            dispatch(editComment(data));
        },
    };
};
export default connect(null, mapDispatchToProps)(ModalEditComment);
