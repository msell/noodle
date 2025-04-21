import { observer } from '@legendapp/state/react';
import * as Crypto from 'expo-crypto';
import { useState } from 'react';
import { FlatList, View, TextInput, TouchableOpacity } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { Tables } from '~/types/database.types';
import { todos$, toggleDone } from '~/utils/SupaLegend';

export const Todo = ({ todo }: { todo: Tables<'todos'> }) => {
  const handleToggle = () => {
    if (todo.id) {
      toggleDone(todo.id);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className="flex-row items-center border-b border-gray-200 p-4">
      <View
        className={`mr-4 h-6 w-6 rounded-full border-2 ${
          todo.done ? 'border-green-500 bg-green-500' : 'border-gray-400'
        } items-center justify-center`}>
        {todo.done && <Text className="text-white">✓</Text>}
      </View>
      <Text
        className={`flex-1 text-lg ${todo.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {todo.text}
      </Text>
    </TouchableOpacity>
  );
};

const AddTodo = () => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim() && todos$) {
      // Add the todo
      const id = Crypto.randomUUID();
      todos$[id].assign({
        id,
        text: text.trim(),
        done: false,
      });
      // Clear the input
      setText('');
    }
  };

  return (
    <View className="flex-row space-x-2 p-4">
      <TextInput
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2"
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
      />
      <TouchableOpacity
        className="justify-center rounded-lg bg-blue-500 px-6 py-2"
        onPress={handleAddTodo}>
        <Text className="font-semibold text-white">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const Todos = observer(() => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get();
  const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => <Todo todo={todo} />;

  return (
    <View className="flex-1">
      <AddTodo />
      {todos ? (
        <FlatList data={Object.values(todos)} renderItem={renderItem} className="flex-1" />
      ) : null}
    </View>
  );
});

export default Todos;
