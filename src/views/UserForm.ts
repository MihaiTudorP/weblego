export class UserForm{
    constructor(public parent: Element) {
    }
    template = (): string =>{
        return `
            <div>
                <h1>User form</h1>
                <input />
            </div>
        `
    };

    render = (): void =>{
        const element = document.createElement('template');
        element.innerHTML = this.template();

        this.parent.append(element.content);
    }
}