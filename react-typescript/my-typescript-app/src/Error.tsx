import { useLocation } from 'react-router-dom'

export default function Error() {
    const location = useLocation();
    return (
        <>
            <h1 style={{ textAlign: "center" }} >
                <span style={{ color: "red" }}>404</span> Could not find what you are looking for
            </h1>
            <hr style={{ backgroundColor: "darkgrey", width: "80%" }} />
            <p style={{ textAlign: "center" }} >'{location.pathname}' was not found</p>
        </>
    )
}

//short cut for arrow functional component is 
// rafce


