import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../data/categories';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryDropdown = () => {
  return (
    <div className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categories
      </a>
      <ul className="dropdown-menu">
        {categories.map(cat => (
          <li key={cat.id}>
            <Link className="dropdown-item" to={`/categories/${cat.slug}`}>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;