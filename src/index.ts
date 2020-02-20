import { User } from './models/User';

const user = new User({id: 1});

user.set({name: 'Mike', age: 20});
user.save();

const userJohn = new User({name: 'John', age: 30});
userJohn.save();