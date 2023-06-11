import * as api from '../api'

const endpoint = '/users'

export async function getAllUsers(search, criteria) {
    return api.get(`${endpoint}?search=${search}&criteria=${criteria}`)
}

export async function getUsersPerPage(page, limit = 5, search, criteria, sort, order) {
    return api.get(`${endpoint}?page=${page}&limit=${limit}&search=${search}&criteria=${criteria}&sort=${sort}&order=${order}`)
}

export async function getUserById(id) {
    return api.get(`${endpoint}/${id}`)
}

export async function editUserById(id, user) {
    return api.put(`${endpoint}/${id}`, user)
}

export async function addUser(user) {
    return api.post(`${endpoint}`, user)
}

export async function deleteUser(id) {
    await api.del(`${endpoint}/${id}`)
}