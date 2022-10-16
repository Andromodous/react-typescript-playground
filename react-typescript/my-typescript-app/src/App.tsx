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
import { auth } from './utils/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'

const App: React.FC = () => {
    const [basket, setBasket] = React.useState<Product[]>([])
    const [user, setUser] = React.useState<User>();
    const [loading, setLoading] = React.useState<boolean>(true);

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

    useEffect(() => {
        let subscribed = true;
        onAuthStateChanged(auth, (user) => {
            if (subscribed) {
                setUser(user as User);
                setLoading(false);
            }
        })
        return () => {
            subscribed = false; //cancel subscription
        }
    }, [])

    return (
        <>
            <ErrorBoundary>
                <AuthContext.Provider value={user as User}>
                    <Context.Provider value={[basket, setBasket]}>
                        <Router>
                            <Header />
                            <div style={{ minHeight: 'calc(85vh - 100px)', overflowX: 'hidden' }}>
                                <Routes>
                                    {!loading && <>
                                        <Route path="/" element={<Todo />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/cart/buy" element={<Privateroutes component={<CheckOut />} />} />
                                        <Route path="/login" element={<Protectedroutes component={<Login />} />} />
                                        <Route path="/logout" element={user ? <Logout /> : <Navigate to='/' />} />
                                        <Route path="/register" element={<Protectedroutes component={<Register />} />} />
                                        <Route path="*" element={<Error />} />
                                    </>
                                    }
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

