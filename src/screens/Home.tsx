import { useState } from 'react'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { VStack, HStack, FlatList, Heading, Text} from 'native-base'
import { ExerciseCard } from '@components/ExerciseCard'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costa')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra'])

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
            {exercises.length}
          </Text>
        </HStack>
        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20}}
        />
      </VStack>
    </VStack>
  )
}
