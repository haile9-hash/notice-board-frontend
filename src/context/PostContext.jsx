import React, { createContext, useState, useContext, useCallback } from 'react';
import { mockPosts } from '../data/mockPosts';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts.filter(p => p.approved));
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const { user, trackInteraction, getUserInteraction } = useContext(AuthContext);

  // Create a new post
  const createPost = (newPostData) => {
    const newPost = {
      id: posts.length + 1,
      ...newPostData,
      approved: user?.role === 'superadmin', // Auto-approve for superadmin
      date: new Date().toISOString().split('T')[0],
      author: user?.name || user?.username,
      likes: 0,
      dislikes: 0,
      comments: [],
      photo: newPostData.photo || null,
      isImportant: newPostData.isImportant || false
    };
    
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    
    // Update filtered posts if needed
    if (newPost.approved) {
      applyFilters(updatedPosts, filterType, filterValue);
    } else {
      // If not approved (for sub-admins), keep filtered posts as is
      applyFilters(updatedPosts.filter(p => p.approved), filterType, filterValue);
    }
    
    return newPost;
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
    if (!user) return; // User must be logged in
    
    const userInteraction = getUserInteraction(id);
    
    // If user already liked this post, remove the like
    if (userInteraction === 'liked') {
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
      );
      setPosts(updatedPosts);
      applyFilters(updatedPosts, filterType, filterValue);
      trackInteraction(id, null); // Remove interaction
      return;
    }
    
    // If user previously disliked, remove dislike and add like
    if (userInteraction === 'disliked') {
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, likes: p.likes + 1, dislikes: Math.max(0, p.dislikes - 1) } : p
      );
      setPosts(updatedPosts);
      applyFilters(updatedPosts, filterType, filterValue);
      trackInteraction(id, 'liked');
      return;
    }
    
    // User hasn't interacted before, add like
    const updatedPosts = posts.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
    trackInteraction(id, 'liked');
  };

  const dislikePost = (id) => {
    if (!user) return; // User must be logged in
    
    const userInteraction = getUserInteraction(id);
    
    // If user already disliked this post, remove the dislike
    if (userInteraction === 'disliked') {
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, dislikes: Math.max(0, p.dislikes - 1) } : p
      );
      setPosts(updatedPosts);
      applyFilters(updatedPosts, filterType, filterValue);
      trackInteraction(id, null); // Remove interaction
      return;
    }
    
    // If user previously liked, remove like and add dislike
    if (userInteraction === 'liked') {
      const updatedPosts = posts.map(p => 
        p.id === id ? { ...p, dislikes: p.dislikes + 1, likes: Math.max(0, p.likes - 1) } : p
      );
      setPosts(updatedPosts);
      applyFilters(updatedPosts, filterType, filterValue);
      trackInteraction(id, 'disliked');
      return;
    }
    
    // User hasn't interacted before, add dislike
    const updatedPosts = posts.map(p => 
      p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
    );
    setPosts(updatedPosts);
    applyFilters(updatedPosts, filterType, filterValue);
    trackInteraction(id, 'disliked');
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
    
    // For regular users, always filter to show only approved posts
    if (!user || user.role === 'user') {
      filtered = postList.filter(p => p.approved);
    }
    
    if (type === 'category' && value) {
      filtered = filtered.filter(p => p.category === value);
    } else if (type === 'faculty' && value) {
      filtered = filtered.filter(p => p.faculty === value);
    } else if (type === 'latest') {
      filtered = [...filtered]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    } else if (type === 'important') {
      filtered = filtered.filter(p => p.isImportant);
    } else if (type === 'my-posts') {
      filtered = filtered.filter(p => p.author === (user?.name || user?.username));
    }
    
    setFilteredPosts(filtered);
  }, [user]);

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
        p.author.toLowerCase().includes(query.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
        (p.faculty && p.faculty.toLowerCase().includes(query.toLowerCase()))
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

  const getApprovedPosts = () => {
    return posts.filter(p => p.approved);
  };

  const getImportantPosts = () => {
    return posts.filter(p => p.approved && p.isImportant);
  };

  const getPostsByFaculty = (facultySlug) => {
    return posts.filter(p => p.approved && p.faculty === facultySlug);
  };

  const getPostsByCategory = (categorySlug) => {
    return posts.filter(p => p.approved && p.category === categorySlug);
  };

  const getRecentPosts = (limit = 5) => {
    return [...posts]
      .filter(p => p.approved)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getPostStats = () => {
    return {
      total: posts.length,
      approved: posts.filter(p => p.approved).length,
      pending: posts.filter(p => !p.approved).length,
      facultyPosts: posts.filter(p => p.faculty).length,
      categoryPosts: posts.filter(p => p.category).length,
      importantPosts: posts.filter(p => p.isImportant).length,
      totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
      totalDislikes: posts.reduce((sum, post) => sum + post.dislikes, 0),
      totalComments: posts.reduce((sum, post) => sum + post.comments.length, 0)
    };
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
    getApprovedPosts,
    getImportantPosts,
    getPostsByFaculty,
    getPostsByCategory,
    getRecentPosts,
    getPostStats,
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