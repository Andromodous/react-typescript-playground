import React, { useEffect } from 'react'
import Todo from './Todo'
import Context from './UserContext'
import Header from './header'
import Cart, { Product } from './cart'
import ErrorBoundary from './ErrorBoundary'
import CheckOut from './checkout'
import Error from './Error'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App: React.FC = () => {
    const [basket, setBasket] = React.useState<Product[]>([])

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
                <Context.Provider value={[basket, setBasket]}>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Todo />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/cart/buy" element={<CheckOut />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </Router>
                </Context.Provider>
            </ErrorBoundary>
        </>
    )

}


export default App;

