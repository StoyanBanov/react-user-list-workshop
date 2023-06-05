import { useEffect } from "react"
import { addUser } from "../../data/services/userService"

export const UserAdd = ({ parentHtmlHandler, handelClose, updateUsers }) => {
    useEffect(() => {
        parentHtmlHandler('Add User', 'user')
    }, [])

    return <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group">
                <label for="firstName">First name</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-user"></i></span>
                    <input id="firstName" name="firstName" type="text" />
                </div>
                <p className="form-error">
                    First name should be at least 3 characters long!
                </p>
            </div>
            <div className="form-group">
                <label for="lastName">Last name</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-user"></i></span>
                    <input id="lastName" name="lastName" type="text" />
                </div>
                <p className="form-error">
                    Last name should be at least 3 characters long!
                </p>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label for="email">Email</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-envelope"></i></span>
                    <input id="email" name="email" type="text" />
                </div>
                <p className="form-error">Email is not valid!</p>
            </div>
            <div className="form-group">
                <label for="phoneNumber">Phone number</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-phone"></i></span>
                    <input id="phoneNumber" name="phoneNumber" type="text" />
                </div>
                <p className="form-error">Phone number is not valid!</p>
            </div>
        </div>

        <div className="form-group long-line">
            <label for="imageUrl">Image Url</label>
            <div className="input-wrapper">
                <span><i className="fa-solid fa-image"></i></span>
                <input id="imageUrl" name="imageUrl" type="text" />
            </div>
            <p className="form-error">ImageUrl is not valid!</p>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label for="country">Country</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-map"></i></span>
                    <input id="country" name="country" type="text" />
                </div>
                <p className="form-error">
                    Country should be at least 2 characters long!
                </p>
            </div>
            <div className="form-group">
                <label for="city">City</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-city"></i></span>
                    <input id="city" name="city" type="text" />
                </div>
                <p className="form-error">
                    City should be at least 3 characters long!
                </p>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label for="street">Street</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-map"></i></span>
                    <input id="street" name="street" type="text" />
                </div>
                <p className="form-error">
                    Street should be at least 3 characters long!
                </p>
            </div>
            <div className="form-group">
                <label for="streetNumber">Street number</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-house-chimney"></i></span>
                    <input id="streetNumber" name="streetNumber" type="text" />
                </div>
                <p className="form-error">
                    Street number should be a positive number!
                </p>
            </div>
        </div>
        <div id="form-actions">
            <button id="action-save" className="btn" type="submit">Save</button>
            <button onClick={handelClose} id="action-cancel" className="btn" type="button">
                Cancel
            </button>
        </div>
    </form>

    async function handleSubmit(e) {
        e.preventDefault()
        const userData = Object.fromEntries(new FormData(e.target))
        const newUser = (await addUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            imageUrl: userData.imageUrl,
            address: {
                country: userData.country,
                city: userData.city,
                street: userData.street,
                streetNumber: userData.streetNumber
            }
        })).user
        updateUsers(newUser)
        handelClose()
    }
}