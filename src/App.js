import './App.css';

import { useEffect, useState } from 'react'

import { Pagination } from './components/pagination/Pagination';
import { Search } from './components/search/Search';
import { UserList } from './components/user-list/UserList';
import { getAllUsers, getUserById } from './data/services/userService';
import { UserOverlay } from './components/user-overlay/UserOverlay';

function App() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
            .then(data => {
                setUsers(data.users)
            })
    }, [])

    function updateUsers(user, userId) {
        const currentUsers = [...users]

        if (user) currentUsers.unshift(user)
        else if (userId) currentUsers.splice(users.findIndex(u => u._id === userId), 1)

        setUsers([...currentUsers])
    }

    const [userOverlay, setUserOverlay] = useState(null)

    function handleCloseOverlay() {
        setUserOverlay(null)
    }

    async function handleUserBtn(action, userId) {
        let user
        if (userId) user = (await getUserById(userId)).user
        setUserOverlay({ action, user, handleCloseOverlay, updateUsers })
    }

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <span className="course">React Course - June 2022</span>
                    <span className="description">User List Demo</span>
                </div>
            </header>

            <main className="main">
                <section className="card users-container">
                    <Search />

                    {userOverlay && <UserOverlay {...userOverlay} />}

                    <div className="table-wrapper">
                        <UserList users={users} handleUserBtn={handleUserBtn} />
                    </div>

                    <button onClick={() => handleUserBtn('add')} className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>
            </main>

            <footer className="footer">
                <p>Copyright © designed by Mihail Valkov</p>
            </footer>
        </div>
    );
}

export default App;
