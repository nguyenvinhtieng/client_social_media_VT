import { useState } from 'react'
import styles from './comment.module.css'
import moment from 'moment'
import { useSelector } from 'react-redux'
import ModalEditComment from './ModalEditComment'
import ModalDeleteComment from './ModalDeleteComment'
function CommentItem({ comment, post_id }) {
    const { auth } = useSelector(state => state)

    const [showOperation, setShowOperation] = useState(false)
    const handleToggleOperation = () => {
        setShowOperation(!showOperation)
    }
    return (
        <li className={styles.commentItem}>
            <div className="avatar-sm">
                <img
                    src={comment.img_user}
                    alt="Avatar of user comment"
                />
            </div>
            <div className={styles.commentContent}>
                <a href={`/user/${comment.slug_user}`} className={styles.commentUser}>
                    {comment.name_user}
                </a>
                <div className={styles.commentText}>
                    {comment.content}
                </div>
            </div>
            <div className={styles.commentTime}>{moment(comment.createdAt).fromNow()} </div>
            {(auth.user.slug === comment.slug_user) &&
                <div className={styles.commentOperations}>
                    <ion-icon onClick={() => handleToggleOperation()} name="ellipsis-horizontal"></ion-icon>
                    {showOperation && (
                        <ul className={styles.commentoperationMenu}>
                            <li className={styles.commentoperationMenuItem}>
                                <ModalEditComment handleToggle={handleToggleOperation} comment={comment} post_id={post_id} />
                            </li>
                            <li className={styles.commentoperationMenuItem}>
                                <ModalDeleteComment handleToggle={handleToggleOperation} comment={comment} post_id={post_id} />
                            </li>
                        </ul>
                    )}
                </div>
            }
        </li>
    )
}

export default CommentItem
