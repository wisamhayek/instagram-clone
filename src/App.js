import { lazy, Suspense } from 'react';
import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import UserAuthListener from './hooks/user-auth-listener';

// import Login2 from "./pages/login2";

const Login =lazy(()=> import ('./pages/login'));
const SignUp =lazy(()=> import ('./pages/sign-up'));
const NotFound =lazy(()=> import ('./pages/not-found'));
const Dashboard =lazy(()=> import ('./pages/dashboard'));
const Login2 =lazy(()=> import ('./pages/login2'));
const Dashboard2 =lazy(()=> import ('./pages/dashboard2'));
const SignUp2 =lazy(()=> import ('./pages/sign-up2'));

function App() {
  const {user} = UserAuthListener;
  // console.log(user);
  return (
    <UserContext.Provider value={{user}}>
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route exact path={ROUTES.LOGIN} element={<Login/>}/>
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}/>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
          <Route exact path="/login2" element={<Login2/>}/>
          <Route exact path="/dashboard2" element={<Dashboard2/>}/>
          <Route exact path="/signup2" element={<SignUp2/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
