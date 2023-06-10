import './App.css';

import { useEffect, useState } from 'react'

import { Pagination } from './components/pagination/Pagination';
import { Search } from './components/search/Search';
import { UserList } from './components/user-list/UserList';
import { getAllUsers, getUserById, getUsersPerPage } from './data/services/userService';
import { UserOverlay } from './components/user-overlay/UserOverlay';

function App() {
    const [users, setUsers] = useState([])

    const [pagesCount, setPagesCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        getAllUsers()
            .then(data => {
                setPagesCount(Math.ceil(data.count / itemsPerPage))
            })
    }, [itemsPerPage])

    useEffect(() => {
        getUsersPerPage(currentPage, itemsPerPage)
            .then(data => {
                setUsers(data.users)
            })
    }, [currentPage, itemsPerPage])

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

                    <Pagination count={pagesCount} setCurrentPage={setCurrentPage} currentPage={currentPage} setItemsPerPage={setItemsPerPage} />
                </section>
            </main>

            <footer className="footer">
                <p>Copyright © designed by Mihail Valkov</p>
            </footer>
        </div>
    );
}

export default App;
