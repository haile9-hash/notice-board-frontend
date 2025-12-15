import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import { PostContext } from '../../context/PostContext';
import faculties from '../../data/faculties';

const FacultyPosts = () => {
  const { fac } = useParams();
  const { filteredPosts, filterPosts } = useContext(PostContext);
  const [facultyName, setFacultyName] = useState('');

  useEffect(() => {
    if (fac) {
      filterPosts('faculty', fac);
      const faculty = faculties.find(f => f.slug === fac);
      setFacultyName(faculty ? faculty.name : fac);
    }
  }, [fac, filterPosts]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{facultyName} Posts</h1>
      <div className="row">
        <div className="col-md-12">
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} />
          ) : (
            <div className="alert alert-info">
              No posts available for this faculty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyPosts;