import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps>{
    constructor(parent: Element, user: User) {
        super(parent, user);
    }
    template(): string {
        const userId = this.model.get('id');
        return  `
            <div>
                <h1>User details</h1>
                <div>User id: ${userId!==undefined && userId!==null?userId:''}</div>
                <div>User name: ${this.model.get('name')}</div>
                <div>Age: ${this.model.get('age')}</div>
            </div>
        `;
    }
}