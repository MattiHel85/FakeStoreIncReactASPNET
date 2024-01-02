import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'
import { RootState } from './redux/slices/rootSlice'

// imported pages 
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import CheckoutPage from './pages/CheckoutPage'
import SignInPage from './pages/SignInPage'
import AlreadySignedInPage from './pages/AlreadySignedInPage'
import SignUpPage from './pages/SignUpPage'
import SingleUserPage from './pages/SingleUserPage'
import ContactPage from './pages/ContactPage'
import UsersPage from './pages/UsersPage'
import AdminPage from './pages/AdminPage'
import AccessDeniedPage from './pages/AccessDeniedPage'
import LanguageProvider from './contextAPI/LanguageContext'

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <LanguageProvider>
        <StyledEngineProvider injectFirst>
          <Router>
            <Routes>

              {/* Home route */}
              <Route path='/' element={<LandingPage />} />

              {/* product routes */}
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/products/:id' element={<SingleProductPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />

              {/* user routes  */}
              <Route path='/signup' element={user ? <AlreadySignedInPage /> : <SignUpPage />} />
              <Route path='/signin' element={user ? <AlreadySignedInPage /> : <SignInPage />} />
              <Route path='/users/:id' element={ <SingleUserPage />} />

              {/* misc routes  */}
              <Route path='/contact' element={ <ContactPage />} />


              {/* admin routes */}
              <Route path='/users' element={ user?.role=== 'admin' ? <UsersPage /> : <AccessDeniedPage />} />
              <Route path='/admin' element={ user?.role=== 'admin' ? <AdminPage /> : <AccessDeniedPage />} />

            </Routes>
          </Router> 
        </StyledEngineProvider>
      </LanguageProvider>
    </>
  )
}

export default App