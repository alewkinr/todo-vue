import Todo from './todo';

export default interface Note {
  title: string;
  todos: Array<Todo>;
  id: number;
}
