import { useEffect } from "react"
import { deleteUser } from "../../data/services/userService"

export const UserDelete = ({ user, handelClose, updateUsers, parentHtmlHandler }) => {
    useEffect(() => {
        parentHtmlHandler('Are you sure you want to delete this account?', 'confirm')
    }, [parentHtmlHandler])

    return <div className="actions">
        <div id="form-actions">
            <button onClick={handleDelete} id="action-save" className="btn" type="submit">Delete</button>
            <button onClick={handelClose} id="action-cancel" className="btn" type="button">
                Cancel
            </button>
        </div>
    </div>

    async function handleDelete(e) {
        await deleteUser(user._id)
        updateUsers(null, user._id)
        handelClose()
    }
}