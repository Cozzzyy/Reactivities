import {makeAutoObservable} from "mobx";

export default class CounterStore {
    title = 'Counter Store';
    count = 0;
    events: string[] =[
        `Initial count is ${this.count}`,
    ]
    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count++;
        this.events.push(`Incremented count to ${this.count}`);
    }

    decrement() {
        this.count--;
        this.events.push(`Decremented count to ${this.count}`);
    }

    reset() {
        this.count = 0;
        this.events.push(`Reset count to ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}