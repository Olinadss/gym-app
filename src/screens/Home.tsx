import { useState } from 'react'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { VStack, HStack, FlatList, Heading, Text} from 'native-base'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costa')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
            isActive={groupSelected === item}
            name={item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{px: 8}}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent={'space-between'} marginBottom={5}>
          <Heading color={'gray.200'} fontSize={'md'}>
            Exercícios
          </Heading>
          <Text color={'gray.200'} fontSize={'sm'}>
            4
          </Text>
        </HStack>
      </VStack>

    </VStack>
  )
}
