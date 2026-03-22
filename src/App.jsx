import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Body from "./Body"
import Landing from "./Landing"
import Feed from './pages/Feed'
import {Provider} from 'react-redux'
import appStore from "./utils/appStore"
import Profile from "./pages/Profile"
import { Connections } from "./components/Connections"
import Request from "./components/Request"
function App() {
  return (
    <>
     <Provider store={appStore}>
       <BrowserRouter basename="/">
         <Routes>
           <Route path='/' element={<Body/>}>
              <Route index element={<Landing/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/feed' element={<Feed/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/connections' element={<Connections/>}/>
              <Route path='/requests' element={<Request/>}/>

           </Route>
         </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
