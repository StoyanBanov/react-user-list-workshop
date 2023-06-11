import { useState } from "react";
import { UserColHeading } from "./UserColHeading";
import { UserRow } from "./UserRow";

export const UserList = ({ users, handleUserBtn, setSortCriteria, setSortOrder }) => {
    const [isSortedBy, setIsSortedBy] = useState('Created')

    return <table className="table" >
        <thead>
            <tr>
                <th>
                    Image
                </th>
                <UserColHeading name={'First name'} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} isSortedBy={isSortedBy} setIsSortedBy={setIsSortedBy} />
                <UserColHeading name={'Last name'} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} isSortedBy={isSortedBy} setIsSortedBy={setIsSortedBy} />
                <UserColHeading name={'Email'} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} isSortedBy={isSortedBy} setIsSortedBy={setIsSortedBy} />
                <UserColHeading name={'Phone'} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} isSortedBy={isSortedBy} setIsSortedBy={setIsSortedBy} />
                <UserColHeading name={'Created'} setSortCriteria={setSortCriteria} setSortOrder={setSortOrder} isSortedBy={isSortedBy} setIsSortedBy={setIsSortedBy} />
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {/* <!-- Table row component --> */}
            {users.map(u => <UserRow key={u._id} user={u} clickHandler={handleUserBtn} />)}
        </tbody>
    </table>
}