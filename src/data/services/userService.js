import * as api from '../api'

const endpoint = '/users'

export async function getAllUsers() {
    return api.get(endpoint)
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