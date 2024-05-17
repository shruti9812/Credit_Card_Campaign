import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

function appDashboard() {
    const [route, setRoute] = useState('appDashboard');
  
    const navigateTo = (newRoute) => {
      setRoute(newRoute);
    };
  
    let pageContent;
    switch (route) {
      case 'Layout':
        pageContent = <Layout navigateTo={navigateTo} />;
        break;
      case 'Register':
        pageContent = <Register navigateTo={navigateTo} />;
        break;
      case 'Dashboard':
        pageContent = <Dashboard navigateTo={navigateTo} />;
        break;
      case 'Products':
        pageContent = <Products navigateTo={navigateTo} />;
        break;
      default:
        pageContent = <Layout navigateTo={navigateTo} />;
    }
  
    return (
      <div className="App">
        {pageContent}
        <div className='bg-yellow'><h1 className='text-7xl text-blue-200'>Hello</h1></div>
      </div>
    );
  }
  

export default appDashboard
