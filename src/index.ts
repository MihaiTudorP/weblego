import { UserForm } from './views/UserForm';
import { User } from './models/User';

const user = User.buildUser({name: 'Name', age: 20});
const container = document.getElementById('root');
if(!container) throw new Error('Unable to render form');
const userForm = new UserForm(container, user);

userForm.render();
