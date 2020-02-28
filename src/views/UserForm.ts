import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps>{
    constructor(parent: Element, model: User) {
        super(parent, model);
    }
    eventsMap(): { [key: string]: ()=> void }{
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:#update-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        }
    }

    template = (): string =>{
        return `
            <div>
                <input id = "name-field" placeholder="${this.model.get('name')}"/>
                <button id="update-name">Update name</button>
                <button class="set-age">Set random age</button>
                <button class="save-model">Save user</button>
            </div>
        `
    };

    onSetAgeClick = (): void => {
        this.model.setRandomAge()
    };

    onSetNameClick = (): void => {
        const input = this.parent.querySelector("#name-field") as HTMLInputElement;
        if (input) {
            const { value } = input;
            this.model.set({ name: value })
        } else throw new Error('Input not found');
    };

    onSaveClick = (): void => {
        this.model.save();
    }
}