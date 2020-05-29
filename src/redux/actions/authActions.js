import { SET_CURRENT_USER } from './types'

// Set logged in user
export const setCurrentUser = (user) => {
	return { type: SET_CURRENT_USER, payload: user }
}
