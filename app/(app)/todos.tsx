import { observer } from '@legendapp/state/react';
import { FlatList, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { Tables } from '~/types/database.types';
import { todos$ as _todos$ } from '~/utils/SupaLegend';

export const Todo = ({ todo }: { todo: Tables<'todos'> }) => {
  return (
    <View>
      <Text>{todo.text}</Text>
    </View>
  );
};

const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get();
  const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => <Todo todo={todo} />;
  if (todos) return <FlatList data={Object.values(todos)} renderItem={renderItem} />;

  return <></>;
});

export default Todos;
