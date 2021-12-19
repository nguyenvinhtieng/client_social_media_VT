import { useState, useRef } from "react";
import styles from "./post.module.css";
import clsx from "clsx";
import Layer from "../layer/Layer";
import Carousel from 'react-elastic-carousel'
import { connect, useSelector } from 'react-redux'
import { userPost } from '../../redux/actions/postAction'
import showToast from "../../utils/showToast";
const CreatePost = ({ userPost }) => {
    const { auth } = useSelector(state => state)
    const { user } = auth
    const imgRef = useRef()
    const [toggleYoutubeLink, setToggleYoutubeLink] = useState(false);
    const [toggleModal, setToggleModal] = useState(false);
    const handleToggleModal = () => {
        setToggleModal(!toggleModal);
    };
    const [post, setPost] = useState({
        content: "",
        images: [],
        previewImages: [],
        youtubeLink: ""
    })
    let { content, youtubeLink } = post
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeImage = (e) => {
        let files = e.target.files
        let newImages = []
        let previewImg = []
        for (let index = 0; index < files.length; index++) {
            newImages.push(files[index])
            previewImg.push(URL.createObjectURL(files[index]))
        }
        setPost({
            ...post,
            images: [...post.images, ...newImages],
            previewImages: [...post.previewImages, ...previewImg]
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (content === "" &&
            post.images.length === 0 &&
            post.youtubeLink === "") {
            showToast("error", "Nothing to post!")
            return
        }
        let formData = new FormData(e.target)
        // formData.append("content", post.content)
        // formData.append("images", post.images)
        // formData.append("youtubeLink", post.youtubeLink)
        userPost(formData)
        handleToggleModal()
        resestState()
    }
    const resestState = () => {
        setPost({
            content: "",
            images: [],
            previewImages: [],
            youtubeLink: ""
        })
    }
    const handleDeleteImg = (index) => {
        console.log(imgRef.current.files)
        // console.log(index)
        console.log(imgRef.current.files.FileList)
        let newImages = post.images.filter((img, i) => i !== index)
        let newPreviewImg = post.previewImages.filter((img, i) => i !== index)
        setPost({ ...post, images: newImages, previewImages: newPreviewImg })
    }
    // console.log(post.images)
    return (
        <div className={styles.createPost}>
            <div className="avatar-sm">
                <img
                    src={user.image}
                    alt={user.image}
                />
            </div>
            <div
                className={styles.createPostInput}
                onClick={() => handleToggleModal()}
            >
                Hey {user.name}! What do you think!...
            </div>
            {toggleModal && (
                <>
                    <Layer handleToggleModal={handleToggleModal} />
                    <form onSubmit={handleSubmit} className={styles.modalCreatePost}>
                        <h2 className={styles.modalHeader}>
                            Create a new post
                        </h2>
                        <div
                            className={styles.closeModal}
                            onClick={() => handleToggleModal()}
                        >
                            <ion-icon name="close"></ion-icon>
                        </div>
                        <div className={styles.modalContent}>
                            <textarea
                                name="content"
                                placeholder={`Hey! ${user.name} what do you think?`}
                                onChange={handleChange}
                                value={content}
                            ></textarea>
                            {toggleYoutubeLink && (
                                <input
                                    type="text"
                                    placeholder="Youtube link"
                                    className={styles.attachYoutubeLink}
                                    name="youtubeLink"
                                    onChange={handleChange}
                                    value={youtubeLink}
                                />
                            )}
                            {(post.previewImages.length) > 0 ?
                                (
                                    <>
                                        <Carousel className={styles.postMedia} itemsToShow={1}
                                            preventDefaultTouchmoveEvent={true}>
                                            {post.previewImages.map((image, index) =>
                                                <div className={styles.postMediaItem} key={index}>
                                                    <img
                                                        src={image}
                                                        alt=""
                                                    />
                                                    <div className={styles.deleteImg}
                                                        onClick={() => handleDeleteImg(index)}>
                                                        <ion-icon name="close-circle"></ion-icon>
                                                    </div>
                                                </div>
                                            )}
                                        </Carousel>
                                    </>
                                )
                                : ("")}
                            <div className={styles.attach}>
                                <div
                                    className={clsx(
                                        styles.attachImages,
                                        styles.attachMedia
                                    )}
                                >
                                    <label htmlFor="postImgs">
                                        <ion-icon name="images"></ion-icon>
                                    </label>
                                    <input
                                        type="file"
                                        name="images"
                                        id="postImgs"
                                        accept="image/png, image/gif, image/jpeg"
                                        multiple
                                        onChange={handleChangeImage}
                                        ref={imgRef}
                                    />
                                    <div className={styles.popup}>
                                        Attach images
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles.attachYoutube,
                                        styles.attachMedia
                                    )}
                                    onClick={() =>
                                        setToggleYoutubeLink(!toggleYoutubeLink)
                                    }
                                >
                                    <ion-icon name="logo-youtube"></ion-icon>
                                    <div className={styles.popup}>
                                        Attach youtube link
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button>Post</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        userPost: (post) => {
            dispatch(userPost(post));
        },
    };
};
export default connect(null, mapDispatchToProps)(CreatePost);
