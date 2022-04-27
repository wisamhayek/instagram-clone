import { lazy, Suspense } from 'react';
import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login =lazy(()=> import ('./pages/login'));
const SignUp =lazy(()=> import ('./pages/sign-up'));
const NotFound =lazy(()=> import ('./pages/not-found'));
const Dashboard =lazy(()=> import ('./pages/dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route exact path={ROUTES.LOGIN} element={<Login/>}/>
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}/>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard/>}/>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
