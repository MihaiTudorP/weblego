import { AxiosPromise, AxiosResponse } from 'axios';

export type Callback = () => void;

interface ModelAttributes<T> {
    get<K extends keyof T>(key: string): T[K];
    set(update: T): void;
    getAll(): T;
}

export interface Identifiable {
    id?: number;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

export class Model<T extends Identifiable> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    get on() {
        return this.events.on;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') throw new Error('Cannot fetch without an id');

        this.sync.fetch(id).then((response: AxiosResponse) => {
            this.set(response.data);
        });
    }

    save() {
        this.sync
            .save(this.attributes.getAll())
            .then(() => {
                this.trigger('save');
            })
            .catch(() => {
                this.trigger('error');
            });
    }
}
