import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Carousel from "react-elastic-carousel";
import clsx from "clsx";
import Header from "../../components/header/Header";
import { getMethod } from "../../utils/fetchData";
import { copyTextToClipboard } from "../../utils/copyTextToClipboard";
import styles from "./postdetail.module.css";
import { URL } from '../../credentials'
function PostDetail() {
    const { auth } = useSelector((state) => state);
    const [post, setPost] = useState({});
    const [showOperation, setShowOperation] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [copied, setCopied] = useState(false);
    const handleToggleOperation = () => {
        setShowOperation(!showOperation);
    };
    const handleToggleShowComment = () => {
        setShowComment(!showComment);
    };
    const copyLinkPost = async () => {
        await copyTextToClipboard(`${URL}/post/${post._id}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    let params = useParams();
    let post_id = params.post_id;
    useEffect(() => {
        const getPost = async () => {
            let res = await getMethod(`posts/view/${post_id}`);
            return res.data;
        };
        getPost()
            .then((data) => {
                if (data.success) {
                    setPost(data.post);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }, [post_id]);
    let hasImgOrYtbLink = false;
    if (post?.images?.length > 0) hasImgOrYtbLink = true;
    if (post?.youtubeLink) hasImgOrYtbLink = true;
    return (
        // <PostItem />
        <>
            {auth.user && <Header />}
            <div className={styles.wrapper}>
                {post._id ? (
                    <div className={styles.postItem}>
                        <div className={styles.postHeader}>
                            <div
                                className={clsx(
                                    styles.avatarUserPost,
                                    "avatar-sm"
                                )}
                            >
                                <img
                                    src={post.img_user}
                                    alt="Avatar of user Who post this post"
                                />
                            </div>
                            <div className={styles.dataUserPost}>
                                <Link
                                    className={styles.userName}
                                    to={`/user/${post.slug_user}`}
                                >
                                    {post.name_user}
                                </Link>
                                <div className={styles.datePost}>
                                    {moment(post.createdAt).fromNow()}
                                </div>
                            </div>

                            <div
                                className={styles.operationPost}
                                onClick={() => handleToggleOperation()}
                            >
                                <ion-icon name="ellipsis-vertical"></ion-icon>
                            </div>

                            {showOperation && (
                                <ul className={styles.dropdownMenuPost}>
                                    <li
                                        className={styles.dropdownMenuItem}
                                        onClick={copyLinkPost}
                                    >
                                        {copied ? "Copied!" : "Copy link"}
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div className={styles.postContent}>
                            <div className={styles.postText}>
                                {post.content}
                            </div>
                            {hasImgOrYtbLink && (
                                <Carousel
                                    className={styles.postMedia}
                                    itemsToShow={1}
                                    preventDefaultTouchmoveEvent={true}
                                >
                                    {post.images.map((image, index) => (
                                        <div
                                            className={styles.postMediaItem}
                                            key={index}
                                        >
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                                    {post.youtubeLink !== "" && (
                                        <div className={styles.postMediaItem}>
                                            <iframe
                                                width="550"
                                                height="315"
                                                src={post.youtubeLink}
                                                title="YouTube video player"
                                                frameBorder="1"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </Carousel>
                            )}
                        </div>
                        <div className={styles.postInteract}>
                            <div className={styles.postLove}>
                                <ion-icon name="heart-outline"></ion-icon>
                            </div>
                            <div
                                onClick={() => handleToggleShowComment()}
                                className={styles.postComment}
                            >
                                <ion-icon name="chatbox-outline"></ion-icon>{" "}
                                {`${post.comments.length} comments`}
                            </div>
                        </div>
                    </div>
                ) : (
                    "Post not found"
                )}
            </div>
        </>
    );
}

export default PostDetail;
