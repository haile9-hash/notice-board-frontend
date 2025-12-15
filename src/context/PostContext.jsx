import React, { createContext, useState, useContext, useCallback } from 'react';
import { mockPosts } from '../data/mockPosts';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const { user } = useContext(AuthContext);

  const createPost = (newPost) => {
    const post = {
      ...newPost,
      id: posts.length + 1,
      date: new Date().toISOString().split('T')[0],
      approved: user?.role === 'superadmin', // Auto-approve for superadmin
      author: user?.name || user?.username,
      likes: 0,
      dislikes: 0,
      comments: []
    };
    
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
    return post;
  };

  const approvePost = (id) => {
    const updatedPosts = posts.map(p => 
      p.id === id ? { ...p, approved: true } : p
    );
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
  };

  const likePost = (id) => {
    const updatedPosts = posts.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
  };

  const dislikePost = (id) => {
    const updatedPosts = posts.map(p => 
      p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
    );
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
  };

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            id: p.comments.length + 1,
            user: user?.username,
            text: comment,
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
  };

  const applyFilters = useCallback((postList, type, value) => {
    let filtered = postList;
    
    if (type === 'category' && value) {
      filtered = postList.filter(p => p.category === value && p.approved);
    } else if (type === 'faculty' && value) {
      filtered = postList.filter(p => p.faculty === value && p.approved);
    } else if (type === 'latest') {
      filtered = [...postList]
        .filter(p => p.approved)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    } else {
      filtered = postList.filter(p => p.approved);
    }
    
    setFilteredPosts(filtered);
  }, []);

  const filterPosts = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
    applyFilters(posts, type, value);
  };

  const searchPosts = (query) => {
    if (!query.trim()) {
      applyFilters(posts, filterType, filterValue);
      return;
    }
    
    const filtered = posts.filter(p => 
      p.approved && (
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.author.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredPosts(filtered);
  };

  // Get posts by user role
  const getUserPosts = () => {
    if (!user) return [];
    
    if (user.role === 'superadmin') {
      return posts;
    } else if (user.role === 'subadmin') {
      return posts.filter(p => p.faculty === user.faculty);
    } else {
      return posts.filter(p => p.approved);
    }
  };

  const getPendingPosts = () => {
    return posts.filter(p => !p.approved);
  };

  const value = {
    posts,
    filteredPosts,
    createPost,
    approvePost,
    deletePost,
    likePost,
    dislikePost,
    addComment,
    filterPosts,
    searchPosts,
    getUserPosts,
    getPendingPosts,
    filterType,
    filterValue
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;