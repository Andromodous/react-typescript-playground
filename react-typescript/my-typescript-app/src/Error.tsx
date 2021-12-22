export default function Error() {
    return (
        <>
            <h1 style={{ textAlign: "center" }} >
                <span style={{ color: "red" }}>404</span> Could not find what you are looking for
            </h1>
            <hr style={{ backgroundColor: "darkgrey", width: "80%" }} />
            <p style={{ textAlign: "center" }} >'{window.location.pathname.substring(1)}' was not found</p>
        </>
    )
}

//short cut for arrow functional component is 
// rafce


