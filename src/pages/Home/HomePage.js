import { useEffect, useState, useRef } from 'react'
import PostList from '../../components/post/PostList'
// import Notification from '../../components/notification/Notification'
import styles from './homepage.module.css'
import Header from '../../components/header/Header'
import CreatePost from '../../components/post/CreatePost'
import { connect, useSelector } from 'react-redux'
import { getPosts } from '../../redux/actions/postAction'
import InfiniteScroll from 'react-infinite-scroll-component';
function HomePage({ getPosts }) {
    const [page, setPage] = useState(0)
    const { posts } = useSelector(state => state)
    useEffect(() => {
        getPosts(page)
    }, [getPosts, page])
    const listRef = useRef()
    return (
        <>
            <Header />
            <div className={styles.mainContainer} ref={listRef}>
                <InfiniteScroll className={styles.leftBlock}
                    dataLength={window.scrollY}
                    next={() => setPage(prev => prev + 1)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >

                    {/* <div className={styles.leftBlock}> */}
                    <CreatePost />
                    <PostList posts={posts} page="home" />
                    {/* </div> */}
                    {/* {items} */}
                </InfiniteScroll>
                {/* <Notification /> */}
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (page) => {
            dispatch(getPosts(page));
        },
    };
};
export default connect(null, mapDispatchToProps)(HomePage)
