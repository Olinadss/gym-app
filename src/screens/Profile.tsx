import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, VStack, Skeleton, Text, Heading } from 'native-base'
import { useState } from 'react'
import { ScrollView, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

const PHOTO_SIZE = 33

export function Profile() {
	const [photoIsLoading, setPhotoIsLoading] = useState(false)
	const [userPhoto, setUserPhoto] = useState('https://github.com/olinadss.png')

	async function handleSelectImage() {
		setPhotoIsLoading(true)
		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.5,
				aspect: [4, 4],
				allowsEditing: true,
			})

			if (photoSelected.canceled) return

			if (photoSelected.assets[0].uri) {
				const photoInfo = await FileSystem.getInfoAsync(
					photoSelected.assets[0].uri,
				)
				if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
					return Alert.alert(
						'Imagem muito grande',
						'A imagem deve ter no máximo 5MB',
					)
				}
				setUserPhoto(photoSelected.assets[0].uri)
			}
		} catch (error) {
			console.log(error)
		} finally {
			setPhotoIsLoading(false)
		}
	}

	return (
		<VStack flex={1}>
			<ScreenHeader title='Perfil' />
			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					{photoIsLoading ? (
						<Skeleton
							w={PHOTO_SIZE}
							h={PHOTO_SIZE}
							rounded={'full'}
							startColor={'gray.500'}
							endColor={'gray.400'}
						/>
					) : (
						<UserPhoto
							source={{ uri: userPhoto }}
							alt='Foto do usuário'
							size={PHOTO_SIZE}
						/>
					)}

					<TouchableOpacity onPress={handleSelectImage}>
						<Text
							color={'green.500'}
							fontWeight={'bold'}
							fontSize={'md'}
							mt={2}
							mb={8}
						>
							Alterar Foto
						</Text>
					</TouchableOpacity>

					<Input bg={'gray.600'} placeholder='Nome' />
					<Input
						bg={'gray.600'}
						placeholder='danilo.santos@gmail.com'
						isDisabled
					/>
					<Heading
						color={'gray.200'}
						fontSize={'md'}
						mb={2}
						alignSelf={'flex-start'}
						mt={12}
					>
						Alterar senha
					</Heading>

					<Input bg={'gray.600'} placeholder='Senha antiga' secureTextEntry />
					<Input bg={'gray.600'} placeholder='Nova senha' secureTextEntry />
					<Input
						bg={'gray.600'}
						placeholder='Confirmar nova senha'
						secureTextEntry
					/>

					<Button title='Atualizar' mt={4} />
				</Center>
			</ScrollView>
		</VStack>
	)
}
