import React, { useState, useContext } from 'react';
import { PostContext } from '../../context/PostContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const { createPost } = useContext(PostContext);

  const handleSubmit = e => {
    e.preventDefault();
    createPost({ title, description, photo });  // Mock create (pending approval)
  };

  return (
    <div className="container">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" className="form-control mb-2" onChange={e => setPhoto(e.target.files[0])} />
        <button type="submit" className="btn btn-primary">Submit for Approval</button>
      </form>
    </div>
  );
};

export default CreatePost;