import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";

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

const counterStore = new CounterStore();
// Create a React Context with the counter store instance.
export const CounterStoreContext = createContext(counterStore);
export const useCounterStore = () => useContext(CounterStoreContext);
//
