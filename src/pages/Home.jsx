import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'; 
import { SessionContext } from '../SessionProvider.jsx';
import { SideMenu } from "../components/SideMenu.jsx";
import { postRepository } from "../repositories/post.js";
import { Post } from "../components/Post.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { authRepositories } from "../repositories/auth.js";

const limit = 5;

function Home() {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const { currentUser,setCurrentUser } = useContext(SessionContext);

    useEffect(() => {
    fetchPosts(1);
    }, []);

    const createPost = async () => {
    const newPost = await postRepository.create(content, currentUser.id);
    // 投稿作成時に user_metadata を currentUser から補完
    const postWithMeta = {
        ...newPost,
        user_id: currentUser.id,
        user_metadata: { name: currentUser.userName, email: currentUser.email },
    };
    setPosts([postWithMeta, ...posts]);
    setContent("");
    };

    const fetchPosts = async (pageNumber) => {
    const fetchedPosts = await postRepository.find(pageNumber, limit);
    setPosts(fetchedPosts);
    };

    const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);
    setPage(nextPage);
    };

    const moveToPrev = async () => {
    const prevPage = page - 1;
    if (prevPage < 1) return;
    await fetchPosts(prevPage);
    setPage(prevPage);
    };

    const deletePost = async (postId) => {
        await postRepository.delete(postId);
        setPosts(posts.filter(post => post.id !== postId));
    };

    const signout = async () => {
        await authRepositories.signout();
        setCurrentUser(null);
    };

    return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">SNS APP</h1>
            <button 
            onClick={signout}
            className="text-white hover:text-red-600">ログアウト</button>
        </div>
        </header>

        <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <textarea
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                />
                <button
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createPost}
                disabled={content === ""}
                >
                Post
                </button>
            </div>

            <div className="mt-4">
                {posts.map((post) => (
    <Post 
        key={post.id} 
        post={post} 
        // 自分の投稿の場合のみonDelete関数を渡す
        onDelete={currentUser?.id === post.user_id ? deletePost : null}
    />
))}
            </div>

            <Pagination
                onPrev={page > 1 ? moveToPrev : null}
                onNext={posts.length >= limit ? moveToNext : null}
            />
            </div>

            <div>
            <SideMenu />
            </div>
        </div>
        </div>
    </div>
);
}

export default Home;
