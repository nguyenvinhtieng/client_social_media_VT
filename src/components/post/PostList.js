import styles from './post.module.css'
import PostItem from './PostItem'

const PostList = ({ posts }) => {
    return (
        <>
            <div className={styles.Postlist} >
                {
                    posts && posts.map(post =>
                        <PostItem key={post._id} post={post} />
                    )}
            </div>
        </>

    )
}

export default PostList