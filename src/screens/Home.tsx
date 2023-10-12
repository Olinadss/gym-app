import { useCallback, useEffect, useState } from 'react'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { VStack, HStack, FlatList, Heading, Text, useToast } from 'native-base'
import { ExerciseCard } from '@components/ExerciseCard'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

export function Home() {
	const [groupSelected, setGroupSelected] = useState('antebraço')
	const [groups, setGroups] = useState<string[]>([])
	const [exercises, setExercises] = useState<ExerciseDTO[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const toast = useToast()

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	function handleOpenExerciseDetails(exerciseId: string) {
		navigation.navigate('exercise', { exerciseId })
	}

	async function fetchGroups() {
		try {
			const response = await api.get('/groups')
			setGroups(response.data)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? error.message
				: 'Não foi possível carregar os grupos musculares'

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
		}
	}

	async function fetchExercisesByGroup() {
		try {
			setIsLoading(true)
			const response = await api.get(`/exercises/bygroup/${groupSelected}`)
			setExercises(response.data)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? error.message
				: 'Não foi possível carregar os exercícios'

			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchGroups()
	}, [])

	useFocusEffect(
		useCallback(() => {
			fetchExercisesByGroup()
		}, [groupSelected]),
	)

	return (
		<VStack flex={1}>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<Group
						isActive={groupSelected.toUpperCase() === item.toUpperCase()}
						name={item}
						onPress={() => setGroupSelected(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{ px: 8 }}
				my={10}
				maxH={10}
				minH={10}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<VStack flex={1} px={8}>
					<HStack justifyContent={'space-between'} marginBottom={5}>
						<Heading color={'gray.200'} fontSize={'md'} fontFamily={'heading'}>
							Exercícios
						</Heading>
						<Text color={'gray.200'} fontSize={'sm'}>
							{exercises.length}
						</Text>
					</HStack>
					<FlatList
						data={exercises}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<ExerciseCard
								data={item}
								onPress={() => handleOpenExerciseDetails(item.id)}
							/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 20 }}
					/>
				</VStack>
			)}
		</VStack>
	)
}
