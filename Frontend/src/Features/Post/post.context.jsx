import { createContext, useState, useEffect, useContext } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [feed, setFeed] = useState([]);
    const [post, setPost] = useState(null);


    return (
        <PostContext.Provider value={{ post, setPost, loading, setLoading, feed, setFeed }}>
            {children}
        </PostContext.Provider>
    )

};