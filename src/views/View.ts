import { Model } from '../models/Model';

export type Region = {
    [key: string]: Element;
};

export abstract class View<T extends Model<K>, K> {
    regions: Region = {};
    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    bindModel() {
        const reRender = () => {
            this.parent.innerHTML = '';
            this.render();
        };
        this.model.on('change', reRender);
        this.model.on('save', reRender);
    }

    onRender():void {}

    render = (): void => {
        this.parent.innerHTML = '';
        const element = document.createElement('template');
        element.innerHTML = this.template();
        this.bindEvents(element.content);
        this.mapRegions(element.content);
        this.onRender();

        this.parent.append(element.content);
    };

    abstract template(): string;
    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    bindEvents(documentFragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            documentFragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    regionsMap(): {[key: string]: string} {
        return {};
    }

    private mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    }
}
