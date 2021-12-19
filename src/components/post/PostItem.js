import { useState, memo } from "react";
import { Link } from 'react-router-dom'
import clsx from "clsx";
import moment from 'moment'
import Carousel from 'react-elastic-carousel'
import styles from "./post.module.css";
import CommentList from "./comments/CommentList";
import { addComment } from '../../redux/actions/postAction'
import { connect, useSelector } from 'react-redux'
import { copyTextToClipboard } from '../../utils/copyTextToClipboard'
import { URL } from '../../credentials'
import ModalDeletePost from './ModalDeletePost'
import showToast from "../../utils/showToast";
function PostItem({ post, addComment }) {
    const [showOperation, setShowOperation] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { auth } = useSelector(state => state)
    const [copied, setCopied] = useState(false)
    const [comment, setComment] = useState("")
    const handleToggleOperation = () => {
        setShowOperation(!showOperation);
    };
    const handleToggleShowComment = () => {
        setShowComment(!showComment);
    };
    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment === '') {
            showToast("error", "Content empty")
            return;
        }
        addComment({ content: comment, post_id: post._id })
        setComment("")
    }

    const copyLinkPost = async () => {
        await copyTextToClipboard(`${URL}/post/${post._id}`)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    let hasImgOrYtbLink = false
    if (post.images.length > 0) hasImgOrYtbLink = true
    if (post.youtubeLink) hasImgOrYtbLink = true
    return (
        <div className={styles.postItem}>
            <div className={styles.postHeader}>
                <div className={clsx(styles.avatarUserPost, "avatar-sm")}>
                    <img
                        src={post.img_user}
                        alt="Avatar of user Who post this post"
                    />
                </div>
                <div className={styles.dataUserPost}>
                    <Link className={styles.userName} to={`/user/${post.slug_user}`}>
                        {post.name_user}
                    </Link>
                    <div className={styles.datePost}>{moment(post.createdAt).fromNow()}</div>
                </div>

                <div
                    className={styles.operationPost}
                    onClick={() => handleToggleOperation()}
                >
                    <ion-icon name="ellipsis-vertical"></ion-icon>
                </div>

                {showOperation && (
                    <ul className={styles.dropdownMenuPost}>
                        <li className={styles.dropdownMenuItem}> Block</li>
                        <li className={styles.dropdownMenuItem}>
                            <Link to={`/post/${post._id}`}>Details</Link>
                        </li>
                        <li className={styles.dropdownMenuItem} onClick={copyLinkPost}>
                            {copied ? "Copied!" : "Copy link"}
                        </li>
                        {(auth.user.slug === post.slug_user) &&
                            <li className={styles.dropdownMenuItem}>
                                <ModalDeletePost post_id={post._id} />
                            </li>
                        }
                    </ul>
                )}
            </div>
            <div className={styles.postContent}>
                <div className={styles.postText}>
                    {post.content}
                </div>
                {hasImgOrYtbLink &&
                    <Carousel className={styles.postMedia} itemsToShow={1}
                        preventDefaultTouchmoveEvent={true}>
                        {post.images.map((image, index) =>
                            <div className={styles.postMediaItem} key={index}>
                                <img
                                    src={image}
                                    alt=""
                                />
                            </div>
                        )}
                        {post.youtubeLink !== "" &&
                            <div className={styles.postMediaItem}>
                                <iframe width="550" height="315" src={post.youtubeLink} title="YouTube video player" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        }

                    </Carousel>
                }
            </div>
            <div className={styles.postInteract}>
                <div className={styles.postLove}>
                    <ion-icon name="heart-outline"></ion-icon>
                </div>
                <div
                    onClick={() => handleToggleShowComment()}
                    className={styles.postComment}
                >
                    <ion-icon name="chatbox-outline"></ion-icon>  {`${post.comments.length} comments`}
                </div>
            </div>
            <form className={styles.formAddComment} onSubmit={handleSubmitComment}>
                <ion-icon name="happy-outline"></ion-icon>
                <input
                    type="text"
                    className={styles.commentInput}
                    placeholder="Enter a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className={styles.commentButton}>post</button>
            </form>
            {showComment && <CommentList comments={post.comments} post_id={post._id} />}
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (data) => {
            dispatch(addComment(data));
        }
    };
};
export default memo(connect(null, mapDispatchToProps)(PostItem));
