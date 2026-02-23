import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";

const Feed = () => {
    const { feed, loading, handleGetFeed } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading || !feed) {
        return <div>Loading...</div>;
    }


    return (
        <main className="flex justify-center items-start min-h-screen">
            <div className="w-full max-w-[450px]">
                <div className="w-full flex md:flex-col flex-col gap-[0.1rem]">
                    {feed.map((post) => (
                        <Post key={post._id} user={post.user} post={post} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Feed;