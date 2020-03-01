import { User, UserProps } from './models/User';
import { UserEdit } from './views/UserEdit';
import { Collection } from './models/Collection';
import { UserList } from './views/UserList';

const user = User.buildUser({ name: 'Name', age: 20 });
const domWrapper = document.getElementById('root');
if (domWrapper)
    domWrapper.innerHTML = `
    <div id = "formWrapper"></div>
    <div id="collectionWrapper"></div>`;
const container = document.getElementById('formWrapper');
if (!container) throw new Error('Unable to render form');
const userEdit = new UserEdit(container, user);
userEdit.render();

const users = new Collection('http://localhost:3000/users', (json: UserProps) => User.buildUser(json));

users.on('change', () => {
    const wrapper = document.getElementById('collectionWrapper');
    if (wrapper) {
        const list = new UserList(wrapper, users);
        list.render();
    }
    else throw new Error('Please create parent div');
});

users.fetch();