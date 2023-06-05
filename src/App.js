import './App.css';

import { useEffect, useState } from 'react'

import { Pagination } from './components/pagination/Pagination';
import { Search } from './components/search/Search';
import { UserList } from './components/user-list/UserList';
import { getAllUsers } from './data/services/userService';

function App() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
            .then(data => {
                setUsers(data.users)
            })
    }, [])

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

                    <div className="table-wrapper">
                        <UserList users={users} />
                    </div>

                    <button className="btn-add btn">Add new user</button>

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
