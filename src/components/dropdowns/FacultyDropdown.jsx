import React from 'react';
import { Link } from 'react-router-dom';
import faculties from '../../data/faculties';
import 'bootstrap/dist/css/bootstrap.min.css';

const FacultyDropdown = () => {
  return (
    <div className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Faculties
      </a>
      <ul className="dropdown-menu">
        {faculties.map(fac => (
          <li key={fac.id}>
            <Link className="dropdown-item" to={`/faculties/${fac.slug}`}>
              {fac.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyDropdown;