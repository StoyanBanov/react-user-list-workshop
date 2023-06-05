export const USerDetails = ({ user }) => {
    return <div className="content">
        <div className="image-container">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""
                className="image" />
        </div>
        <div className="user-details">
            <p>User Id: <strong>{user._id}</strong></p>
            <p>
                Full Name:
                <strong> {user.firstName} {user.lastName} </strong>
            </p>
            <p>Email: <strong>{user.email}</strong></p>
            <p>Phone Number: <strong>{user.phoneNumber}</strong></p>
            <p>
                Address:
                <strong> {formatAddress(user.address)} </strong>
            </p>

            <p>Created on: <strong>{formatDate(user.createdAt)}</strong></p>
            <p>Modified on: <strong>Thursday, June 29, 2022</strong></p>
        </div>
    </div>

    function formatAddress(address) {
        return `${user.address.country}, ${user.address.city}, ${user.address.street} ${user.address.number}`
    }

    function formatDate(date) {
        return `${date}`
    }
}