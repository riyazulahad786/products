import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './component/Layout';
import ProductDetail from './pages/ProductDetail';
import CompareProduct from './pages/CompareProduct';

const App = () => (
  <Router>
    <Layout>
    
      <Routes>
      <Route exact path="/" element={<ProductDetail/>} />
      <Route path="/product" element={<CompareProduct/>} />
      </Routes>
     
    </Layout>
  </Router>
);

export default App;
