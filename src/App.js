import './App.css';
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import Home from "./home/Home";
import {useRoutes} from 'react-router-dom'
import AuthProvider from "./contexts/authContext";
import Header from "./header";

function App() {
    const routesArray = [
        {
            path: "*",
            element: <Register />
        },

        {
            path: "/login",
            element: <Login />
        },

        {
            path: "/register",
            element: <Register />
        },

        {
            path: "/home",
            element: <Home />
        }
    ];

    let routeElement = useRoutes(routesArray);

    return (
      <AuthProvider>
          <Header />
          <div className="w-full h-screen flex flex-col">{routeElement}</div>
      </AuthProvider>
    );
}

export default App;
