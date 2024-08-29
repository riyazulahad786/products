import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className='d-flex flex-column vh-100'>
    <Header />
    <div className='d-flex flex-grow-1'>
      <Sidebar />
      <main className='flex-fill p-3'>
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
