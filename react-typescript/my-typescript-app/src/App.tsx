import React, { useEffect } from 'react'
import Todo from './Todo'
import Context from './CartContext'
import AuthContext from './AuthContext'
import Header from './header'
import Cart, { Product } from './cart'
import ErrorBoundary from './ErrorBoundary'
import CheckOut from './checkout'
import Error from './Error'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import { Login } from './Login'
import Register from './Register'
import Privateroutes from './Routes/Privateroutes'
import Protectedroutes from './Routes/Protectedroutes'
import Logout from './Logout'
import Footer from './Footer'

const App: React.FC = () => {
    const [basket, setBasket] = React.useState<Product[]>([])
    const [token, setToken] = React.useState<string>("");

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            const cart: Product[] = JSON.parse(localStorage.getItem('cart') as string);
            setBasket([...cart]);
        }
    }, [])

    useEffect(() => {
        if (basket.length > 0)
            localStorage.setItem('cart', JSON.stringify(basket));
        else {
            localStorage.removeItem('cart');
        }
    }, [basket])

    return (
        <>
            <ErrorBoundary>
                <AuthContext.Provider value={[token, setToken]}>
                    <Context.Provider value={[basket, setBasket]}>
                        <Router>
                            <Header />
                            <div style={{ minHeight: 'calc(85vh - 100px)', overflowX: 'hidden' }}>
                                <Routes>
                                    <Route path="/" element={<Todo />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/cart/buy" element={<Privateroutes component={<CheckOut />} />} />
                                    <Route path="/login" element={<Protectedroutes component={<Login />} />} />
                                    <Route path="/logout" element={token ? <Logout /> : <Navigate to='/' />} />
                                    <Route path="/register" element={<Protectedroutes component={<Register />} />} />
                                    <Route path="*" element={<Error />} />
                                </Routes>
                            </div>
                            <Footer />
                        </Router>
                    </Context.Provider>
                </AuthContext.Provider>
            </ErrorBoundary>
        </>
    )

}


export default App;

