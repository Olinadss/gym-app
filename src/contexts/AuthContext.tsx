import { ReactNode, createContext, useState, useEffect } from 'react'

import {
	storageUserSave,
	storageUserGet,
	storageUserRemove,
} from '../storage/storageUser'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'

export type AuthContextDataProps = {
	user: UserDTO
	signIn: (email: string, password: string) => void
	isLoadingStorageData: boolean
	signOut: () => Promise<void>
}

type AuthContextProviderProps = {
	children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState({} as UserDTO)
	const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post('/sessions', { email, password })

			if (data.user) {
				setUser(data.user)
				storageUserSave(data.user)
			}
		} catch (error) {
			throw error
		}
	}

	async function signOut() {
		try {
			setIsLoadingStorageData(true)
			setUser({} as UserDTO)
			await storageUserRemove()
		} catch (error) {
			throw error
		} finally {
			setIsLoadingStorageData(false)
		}
	}

	async function loadUserData() {
		try {
			const userLogged = await storageUserGet()

			if (userLogged) {
				setUser(userLogged)
			}
		} catch (error) {
			throw error
		} finally {
			setIsLoadingStorageData(false)
		}
	}

	useEffect(() => {
		loadUserData()
	}, [])

	return (
		<AuthContext.Provider
			value={{ user, signIn, signOut, isLoadingStorageData }}
		>
			{children}
		</AuthContext.Provider>
	)
}
