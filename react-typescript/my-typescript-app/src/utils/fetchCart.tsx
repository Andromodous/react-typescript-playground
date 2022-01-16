import { useContext } from 'react'
import Context from '../CartContext';

export default function FetchCart() {
    return useContext(Context);
}


