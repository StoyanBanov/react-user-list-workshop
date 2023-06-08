import './App.css';

import { useEffect, useState } from 'react'

import { Pagination } from './components/pagination/Pagination';
import { Search } from './components/search/Search';
import { UserList } from './components/user-list/UserList';
import { getAllUsers, getUserById, getUsersPerPage } from './data/services/userService';
import { UserOverlay } from './components/user-overlay/UserOverlay';

function App() {
    const [users, setUsers] = useState([])

    const [count, setCount] = useState(0)

    useEffect(() => {
        getAllUsers()
            .then(data => {
                setCount(Math.ceil(data.count / 5))
            })
        getUsersPerPage(1, 5)
            .then(data => {
                setUsers(data.users)
            })
    }, [])

    function updateUsers(user, userId) {
        const currentUsers = [...users]

        if (userId) {
            const userIndex = currentUsers.findIndex(u => u._id === userId)
            if (user) currentUsers[userIndex] = user
            else currentUsers.splice(userIndex, 1)
        } else currentUsers.unshift(user)

        setUsers(currentUsers)
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

                    <Pagination count={count} />
                </section>
            </main>

            <footer className="footer">
                <p>Copyright © designed by Mihail Valkov</p>
            </footer>
        </div>
    );
}

export default App;
