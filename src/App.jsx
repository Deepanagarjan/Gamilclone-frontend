import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inbox from './Components/Inbox';
// import Navbar from './Components/navbar';
// import Sidebar from './Components/SideBar';
import Body from './Components/Body';
import Mail from './Components/mail';
import SendEmail from './Components/SendEmail';
import Login from './Components/login';
import Signup from './Components/Signup';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className='flex'>
      
          <Body />
        
       </div>
    ),
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  const { user } = useSelector(state => state.app);

  return (
    <div className='bg-[#F6F8FC] h-screen'>
      <RouterProvider router={appRouter} />
      {user && (
        <div className='flex'>
        <Toaster />
        <SendEmail />
    </div>
      )}
    
    </div>
  );
}

export default App;
