import { createContext } from 'react'
import { Product } from './cart';

// type ContextType = {
//     basket: Product[],
//     setBasket: (basket: Product[]) => void
// }

const Context = createContext<Product[] | any>([])

export default Context;