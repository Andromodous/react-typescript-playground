import React from 'react'
import { Product } from './cart';

// type ContextType = {
//     basket: Product[],
//     setBasket: (basket: Product[]) => void
// }

const Context = React.createContext<Product[] | any>([])

export default Context;