import { router } from "@inertiajs/react";
import api from "../api.jsx";
import BaseLayout from "../Layout/BaseLayout";
import { useState } from "react";

export default function EditPost({post}){
    const [formData, setFormData] = useState({
        title: post.title,
        body: post.body
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = async (e, postId) => {
        e.preventDefault();
        const result = await api.put('/edit-post/' + postId, formData);
        if(result.data.status === 'success'){
            router.visit('/');
        }else{
            alert('Failed to update post');
        }
    }
    return(
        <BaseLayout>
            <h2>Edit Post Page</h2>
            <div key={post.id} className="border-b pb-4 mb-4">
                <form>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="body">Content:</label>
                        <textarea name="body" value={formData.body} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <button type="button" onClick={(e) => handleUpdate(e, post.id)}>Update Post</button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    )
}