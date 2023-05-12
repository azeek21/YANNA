import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { BSON } from "realm";
import useDatabase, { Note } from "../database";

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
  note: Note | null;

  constructor(id: string) {
    const { getNote } = useDatabase();
    this.note = getNote(new BSON.ObjectId(id));
    makeObservable(this, {
      note: observable,
    });
  }
}

const counterStore = new CounterStore();
// Create a React Context with the counter store instance.
export const CounterStoreContext = createContext(counterStore);
export const useCounterStore = () => useContext(CounterStoreContext);
//
