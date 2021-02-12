import { createStore } from 'vuex';
import Todo from '@/models/todo';
import Note from '@/models/note';

export default createStore({
  state: {
    notes: [] as Note[],
    currentNote: {
      title: '',
      todos: [] as Todo[],
      id: 0,
    } as Note,
  },
  mutations: {
    addNote(state) {
      state.notes.push(state.currentNote);
    },
    deleteNote(state) {
      state.notes = state.notes.filter((note) => note.id !== state.currentNote.id);
    },
    updateNote(state) {
      const note = state.notes.find((updatingNote) => updatingNote.id === state.currentNote.id);
      const index = state.notes.indexOf(note as Note);
      state.notes[index] = state.currentNote;
    },
    setCurrentNote(state, payload: Note) {
      state.currentNote = payload;
    },
    updateTitle(state, payload: string) {
      state.currentNote.title = payload;
    },
    updateTodos(state, payload: Todo[]) {
      state.currentNote.todos = payload;
    },
    addNewTodo(state) {
      state.currentNote.todos.push({
        text: '',
        completed: false,
      });
    },
    deleteTodo(state, index: number) {
      state.currentNote.todos.splice(index, 1);
    },
  },
  actions: {
    saveNote({ commit }) {
      const isOldNote: boolean = this.state.notes.some((el) => el.id === this.state.currentNote.id);
      if (isOldNote) {
        commit('updateNote');
      } else {
        commit('addNote');
      }
    },
    fetchCurrentNote({ commit }, noteId: number) {
      const note = JSON.parse(JSON.stringify(this.state.notes.find((fetchingNote) => fetchingNote.id === noteId)));
      commit('setCurrentNote', note);
    },
    updateCurrentNote({ commit }, note: Note) {
      commit('setCurrentNote', note);
    },
  },
  getters: {
    getIdOfLastNote(state): number {
      if (state.notes.length > 0) {
        const index = state.notes.length - 1;

        return state.notes[index].id;
      }
      return 0;
    },
  },
  strict: true,
});
