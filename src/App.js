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

    const [searchValue, setSearchValue] = useState('')
    const [searchCriteria, setSearchCriteria] = useState('')

    const [sortCriteria, setSortCriteria] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')

    useEffect(() => {
        getAllUsers(searchValue, searchCriteria, sortCriteria, sortOrder)
            .then(data => {
                setPagesCount(Math.ceil(data.count / itemsPerPage))
            })
    }, [itemsPerPage, users, searchValue, searchCriteria, sortCriteria, sortOrder])

    useEffect(() => {
        getUsersPerPage(currentPage, itemsPerPage, searchValue, searchCriteria, sortCriteria, sortOrder)
            .then(data => {
                setUsers(data.users)
            })
    }, [currentPage, itemsPerPage, searchValue, searchCriteria, sortCriteria, sortOrder])

    function updateUsers(user, userId) {
        const currentUsers = [...users]

        if (userId) {
            const userIndex = currentUsers.findIndex(u => u._id === userId)
            if (user) {
                currentUsers[userIndex] = user
                setUsers(currentUsers)
            } else {
                currentUsers.splice(userIndex, 1)
                if (currentUsers.length < itemsPerPage) {
                    getUsersPerPage(currentPage, itemsPerPage)
                        .then(data => {
                            currentUsers.push(data.users[0])
                            setUsers(data.users)
                        })
                }
            }
        } else {
            currentUsers.unshift(user)
            if (currentUsers.length > itemsPerPage) currentUsers.pop()
            setUsers(currentUsers)
        }
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
                    <Search setSearchValue={setSearchValue} setSearchCriteria={setSearchCriteria} setCurrentPage={setCurrentPage} />

                    {userOverlay && <UserOverlay {...userOverlay} />}

                    <div className="table-wrapper">
                        <UserList users={users} handleUserBtn={handleUserBtn} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} />
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
