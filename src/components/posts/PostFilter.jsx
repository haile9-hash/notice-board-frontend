import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostFilter = ({ onFilter }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Filter posts..."
      onChange={e => onFilter(e.target.value)}
    />
  );
};

export default PostFilter;