import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({name: 'Name', age: 20});
const container = document.getElementById('root');
if(!container) throw new Error('Unable to render form');
const userEdit = new UserEdit(container, user);
userEdit.render();
