import React, { useEffect } from 'react'
import Todo from './Todo'
import Context from './CartContext'
import AuthContext from './AuthContext'
import Header from './header'
import Cart, { Product } from './cart'
import ErrorBoundary from './ErrorBoundary'
import CheckOut from './checkout'
import Error from './Error'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Login } from './Login'
import Register from './Register'

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
        localStorage.setItem('cart', JSON.stringify(basket));
    }, [basket])

    return (
        <>
            {/* does not work for event handlers like onClick */}

            <ErrorBoundary>
                <AuthContext.Provider value={[token, setToken]}>
                    <Context.Provider value={[basket, setBasket]}>
                        <Router>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Todo />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/cart/buy" element={<CheckOut />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </Router>
                    </Context.Provider>
                </AuthContext.Provider>
            </ErrorBoundary>
        </>
    )

}


export default App;

