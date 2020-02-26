import { User } from '../models/User';

export class UserForm{
    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }

    bindModel(){
        this.model.on('change', ()=>{
            this.parent.innerHTML = '';
            this.render();``
        })
    }
    eventsMap(): { [key: string]: ()=> void }{
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:#update-name': this.onSetNameClick,
        }
    }

    template = (): string =>{
        return `
            <div>
                <h1>User form</h1>
                <div>User name: ${this.model.get('name')}</div>
                <div>Age: ${this.model.get('age')}</div>
                <input id = "name-field"/>
                <button id="update-name">Update name</button>
                <button class="set-age">Set random age</button>
            </div>
        `
    };
    bindEvents(documentFragment: DocumentFragment): void{
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap){
            const [eventName, selector] = eventKey.split(':');

            documentFragment.querySelectorAll(selector).forEach((element)=>{
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
        }
    }

    render = (): void =>{
        const element = document.createElement('template');
        element.innerHTML = this.template();
        this.bindEvents(element.content);
        this.parent.append(element.content);
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
}