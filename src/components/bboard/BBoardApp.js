/*
  BBoardApp shows how to use React Router to create multiscreen single page apps. The tutorial below has more info:
     https://reactrouter.com/docs/en/v6/getting-started/tutorial

*/

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ValueProvider from '../ValueContext';
import Layout from './Layout';
import Profile from './Profile';
import Home from './Home';
import BBoards from './BBoards'
import Registration from './Registration'


const App = () => {
  const data =
    {name:"",
     email:"",
     appURL: 'https://glacial-hamlet-05511.herokuapp.com',
     //appURL: 'http://127.0.0.1:3000',
     secret: "",
   }

  return (
    <ValueProvider value={data}>
      <BrowserRouter>
       <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="registration" element={<Registration />} />
          <Route path="bboards" element={<BBoards />} />
        </Routes>
       </Layout>
      </BrowserRouter>
    </ValueProvider>
  )
}

export default App
