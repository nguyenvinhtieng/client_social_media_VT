import styles from './comment.module.css'
import CommentItem from './CommentItem'

function CommentList({ comments, post_id }) {
    return (
        <ul className={styles.commentList}>
            {comments.map(comment =>
                <CommentItem key={comment._id} comment={comment} post_id={post_id} />
            )}
        </ul>
    )
}
export default CommentList
