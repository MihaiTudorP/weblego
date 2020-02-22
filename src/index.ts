import { User } from './models/User';

const user = User.build({ id: 1 });

user.fetch();

const userJohn = User.build({ name: 'John', age: 30 });
userJohn.save();

user.on('change', () => {
    console.log('User was changed!');
});

user.on('save', () => {
    console.log('User was saved successfully.');
});

user.on('error', () => {
    console.log('An error occurred.');
});

user.set({ name: 'Jake', age: 25 });

user.save();

console.log(user);

class Person {
    constructor(public firstName: string, public lastName: string) {}
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

user.fetch();

const person = new Person('Michael', 'Phelps');
console.log(person.fullName);
