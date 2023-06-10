import { useEffect, useState } from "react"
import { addUser, editUserById } from "../../data/services/userService"
import { actions } from "./userOverlayConsts"

export const UserForm = ({ parentHtmlHandler, handelClose, updateUsers, user, action }) => {
    useEffect(() => {
        parentHtmlHandler({ title: 'Add User', containerClassName: 'user' })
    }, [])


    const isEditAction = action === actions.edit

    const [values, setValues] = useState({
        firstName: isEditAction ? user.firstName : '',
        lastName: isEditAction ? user.lastName : '',
        email: isEditAction ? user.email : '',
        phoneNumber: isEditAction ? user.phoneNumber : '',
        imageUrl: isEditAction ? user.imageUrl : '',
        country: isEditAction ? user.address.country : '',
        city: isEditAction ? user.address.city : '',
        street: isEditAction ? user.address.street : '',
        streetNumber: isEditAction ? user.address.streetNumber : ''
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        imageUrl: false,
        country: false,
        city: false,
        street: false,
        streetNumber: false
    })

    function handleValueChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function validateLength(e, minLength) {
        setErrors({
            ...errors,
            [e.target.name]: e.target.value.length < minLength
        })
    }

    function validatePositiveNumber(e) {
        setErrors({
            ...errors,
            [e.target.name]: isNaN(Number(e.target.value)) && Number(e.target.value) > 0
        })
    }

    function validateImageUrl(e) {
        setErrors({
            ...errors,
            [e.target.name]: !(e.target.value.startsWith('http://') || e.target.value.startsWith('https://'))
        })
    }

    function validatePhone(e) {
        setErrors({
            ...errors,
            [e.target.name]: !(/^\+?\d[\d -]{9,20}$/gm.test(e.target.value))
        })
    }

    function validateEmail(e) {
        setErrors({
            ...errors,
            [e.target.name]: !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm.test(e.target.value))
        })
    }

    return <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-user"></i></span>
                    <input id="firstName" name="firstName" type="text" value={values.firstName} onChange={handleValueChange} onBlur={(e) => validateLength(e, 3)} />
                </div>
                {errors.firstName &&
                    <p className="form-error">
                        First name should be at least 3 characters long!
                    </p>
                }
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-user"></i></span>
                    <input id="lastName" name="lastName" type="text" value={values.lastName} onChange={handleValueChange} onBlur={(e) => validateLength(e, 3)} />
                </div>
                {errors.lastName &&
                    <p className="form-error">
                        Last name should be at least 3 characters long!
                    </p>
                }
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-envelope"></i></span>
                    <input id="email" name="email" type="text" value={values.email} onChange={handleValueChange} onBlur={validateEmail} />
                </div>
                {errors.email &&
                    <p className="form-error">Email is not valid!</p>
                }
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-phone"></i></span>
                    <input id="phoneNumber" name="phoneNumber" type="text" value={values.phoneNumber} onChange={handleValueChange} onBlur={validatePhone} />
                </div>
                {errors.phoneNumber &&
                    <p className="form-error">Phone number is not valid!</p>
                }
            </div>
        </div>

        <div className="form-group long-line">
            <label htmlFor="imageUrl">Image Url</label>
            <div className="input-wrapper">
                <span><i className="fa-solid fa-image"></i></span>
                <input id="imageUrl" name="imageUrl" type="text" value={values.imageUrl} onChange={handleValueChange} onBlur={validateImageUrl} />
            </div>
            {errors.imageUrl &&
                <p className="form-error">ImageUrl is not valid!</p>
            }
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-map"></i></span>
                    <input id="country" name="country" type="text" value={values.country} onChange={handleValueChange} onBlur={(e) => validateLength(e, 2)} />
                </div>
                {errors.country &&
                    <p className="form-error">
                        Country should be at least 2 characters long!
                    </p>
                }
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-city"></i></span>
                    <input id="city" name="city" type="text" value={values.city} onChange={handleValueChange} onBlur={(e) => validateLength(e, 3)} />
                </div>
                {errors.city &&
                    <p className="form-error">
                        City should be at least 3 characters long!
                    </p>
                }
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="street">Street</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-map"></i></span>
                    <input id="street" name="street" type="text" value={values.street} onChange={handleValueChange} onBlur={(e) => validateLength(e, 3)} />
                </div>
                {errors.street &&
                    <p className="form-error">
                        Street should be at least 3 characters long!
                    </p>
                }
            </div>
            <div className="form-group">
                <label htmlFor="streetNumber">Street number</label>
                <div className="input-wrapper">
                    <span><i className="fa-solid fa-house-chimney"></i></span>
                    <input id="streetNumber" name="streetNumber" type="text" value={values.streetNumber} onChange={handleValueChange} onBlur={validatePositiveNumber} />
                </div>
                {errors.streetNumber &&
                    <p className="form-error">
                        Street number should be a positive number!
                    </p>
                }
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
        const userDataProper = {
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
        }
        const responseUser = (isEditAction ? await editUserById(user._id, userDataProper) : await addUser(userDataProper)).user
        updateUsers(responseUser, (isEditAction ? responseUser._id : null))
        handelClose()
    }
}