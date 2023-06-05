import * as api from '../api'

const endpoint = '/users'

export async function getAllUsers() {
    return api.get(endpoint)
}

export async function getUserById(id) {
    return api.get(`${endpoint}/${id}`)
}