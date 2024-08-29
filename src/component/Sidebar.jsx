// import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-light border-right " id="sidebar-wrapper">
    <div className="sidebar-heading mt-3 fs-5 mx-3">Menu</div>
    <div className="list-group list-group-flush">
      <Link to="/" className="list-group-item list-group-item-action bg-light">Product Details</Link>
      <Link to="/product" className="list-group-item list-group-item-action bg-light">Compare Products</Link>
    </div>
  </div>
);

export default Sidebar;
