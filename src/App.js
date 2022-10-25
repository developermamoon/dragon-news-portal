import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes/Routes';

function App() {





  
  return (
    <div className="App">
      <RouterProvider router = {routes}></RouterProvider>
    </div>
  );
}

export default App;
