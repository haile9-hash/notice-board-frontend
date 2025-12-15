import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import { PostContext } from '../../context/PostContext';
import categories from '../../data/categories';

const CategoryPosts = () => {
  const { cat } = useParams();
  const { filteredPosts, filterPosts } = useContext(PostContext);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (cat) {
      filterPosts('category', cat);
      const category = categories.find(c => c.slug === cat);
      setCategoryName(category ? category.name : cat);
    }
  }, [cat, filterPosts]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{categoryName} Posts</h1>
      <div className="row">
        <div className="col-md-12">
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} />
          ) : (
            <div className="alert alert-info">
              No posts available for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts;