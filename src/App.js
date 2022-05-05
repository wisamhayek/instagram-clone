import { lazy, Suspense } from 'react';
import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import UserAuthListener from './hooks/user-auth-listener';


const NotFound =lazy(()=> import ('./pages/not-found'));
const Login =lazy(()=> import ('./pages/login'));
const Dashboard =lazy(()=> import ('./pages/dashboard'));
const SignUp =lazy(()=> import ('./pages/sign-up'));
const Profile =lazy(()=> import ('./pages/profile'));

function App() {
  const {user} = UserAuthListener;
  // console.log(user);
  return (
    <UserContext.Provider value={{user}}>
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
          <Route exact path={ROUTES.LOGIN} element={<Login/>}/>
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}/>
          <Route exact path={ROUTES.PROFILE} element={<Profile/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
