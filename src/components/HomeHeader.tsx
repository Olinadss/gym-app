import { Heading, VStack, Text, HStack, Icon } from 'native-base'
import { UserPhoto } from './UserPhoto'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack backgroundColor={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto 
        size={16}
        source={{
          uri: 'https://github.com/olinadss.png'
        }}
        alt='Imagem do usuário'
        mr={4}
      />
      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>Olá,</Text>
        <Heading color={'gray.100'} fontSize={'md'}>Danilo</Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name='logout' color={'gray.200'}
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}