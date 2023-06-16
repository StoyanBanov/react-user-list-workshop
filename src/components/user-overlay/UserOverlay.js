import { useState } from 'react'
import { actions } from './userOverlayConsts'
import { USerDetails } from './UserDetails'
import { UserDelete } from './UserDelete'
import { UserForm } from './UserForm'

export const UserOverlay = ({ action, user, handleCloseOverlay, updateUsers }) => {
    const [htmlFromChild, setHtmlFromChild] = useState(null)

    return <div className="overlay">
        <div className="backdrop"></div>
        <div className="modal">
            <div className={`${htmlFromChild?.containerClassName}-container`}>
                <header className="headers">
                    <h2>{htmlFromChild?.title}</h2>
                    <button onClick={handleCloseOverlay} className="btn close">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                            className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path fill="currentColor"
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                            </path>
                        </svg>
                    </button>
                </header>
                {action === actions.details && <USerDetails parentHtmlHandler={setHtmlFromChild} user={user} />}
                {action === actions.edit && <UserForm parentHtmlHandler={setHtmlFromChild} user={user} handelClose={handleCloseOverlay} updateUsers={updateUsers} action={actions.edit} />}
                {action === actions.delete && <UserDelete parentHtmlHandler={setHtmlFromChild} user={user} handelClose={handleCloseOverlay} updateUsers={updateUsers} />}
                {action === actions.add && <UserForm parentHtmlHandler={setHtmlFromChild} handelClose={handleCloseOverlay} updateUsers={updateUsers} />}
            </div>
        </div>
    </div>
}