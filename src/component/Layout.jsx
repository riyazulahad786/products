import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className=''>
   <div className=''>
   <Header />
   </div>
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid mt-2">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
