import BaseLayout from "../Layout/BaseLayout";
import React,{useState} from "react";
import { useAuth } from "../Context/Context.jsx";
import api from "../api.jsx";
import { router } from '@inertiajs/react';


export default function Homepage({posts}){
    const { user } = useAuth();
    const [postTitle, setPostTitle] = useState(""); 
    const [postContent, setPostContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await api.post('/create-post', {
            title: postTitle,
            body: postContent
        })      
        
        if(result.data.status === 'success') {
            router.reload();
            setPostTitle("");
            setPostContent("");
        }else{
            alert('Failed to create post');
        }
        router.reload();
    }

    const handleDelete = async (e,postId) => {
        e.preventDefault();
        const result  = await api.delete('/delete-post/' + postId);
        
        if(result.data.status === 'success'){
            router.reload();
        }else{
            alert('Failed to delete post');
        }
    };

    if(!user){
        return(
            <BaseLayout>
                <h2>Welcome to the Homepage Guest</h2>
            </BaseLayout>
        );
    }
    return (
        <BaseLayout>
            <h2>Welcome to the Homepage {user.name}</h2> 
            <div className="border p-4 mt-4">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="body">Content:</label>
                        <textarea id="body" name="body" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">Create Post</button>
                </form>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Posts</h3>
                {posts && posts.length > 0 ? posts.map(
                    (post) => (
                        <div key={post.id} className="border-b pb-4 mb-4">
                            <h4 className="text-lg font-semibold">{post.title}</h4>
                            <p>{post.body}</p>
                            <p className="text-sm text-gray-500">By {post.user.name}</p>
                            <button type="button" onClick={(e) => handleDelete(e, post.id)} className="text-red-500">Delete</button>
                        </div>
                    )
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </BaseLayout>
    );
} 