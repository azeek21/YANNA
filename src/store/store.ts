import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { notes } from "./fakeData";

class CounterStore {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action.bound,
      decrement: action.bound,
    });
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

class NoteStore {
  notes: Array<{ id: number; title: string; text: string }> = notes;

  constructor() {
    makeObservable(this, {
      notes: observable,
      getNote: action.bound,
      updateNote: action.bound,
      createNote: action.bound,
      deleteNote: action.bound,
    });
  }

  getNote(id: number) {
    return this.notes.find((note) => note.id == id);
  }

  updateNote(note: { id: number; title: string; text: string }) {
    const index = this.notes.findIndex((item) => item.id == note.id);
    this.notes[index] = note;
    this.notes = [...this.notes];
  }

  createNote() {
    const note = {
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 0,
      title: "",
      text: "",
    };
    this.notes.push(note);
    return note.id;
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter((item) => item.id != id);
  }
}

const counterStore = new CounterStore();
// Create a React Context with the counter store instance.
export const CounterStoreContext = createContext(counterStore);
export const useCounterStore = () => useContext(CounterStoreContext);
//

const noteStore = new NoteStore();
export const NoteStoreContext = createContext(noteStore);
export const useNoteStore = () => useContext(NoteStoreContext);
