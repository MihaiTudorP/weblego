import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserProps {
    name?: string;
    age?: number;
    id?:number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps>{
    static buildUser = (attrs: UserProps) =>{
        return new User(new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync(rootUrl));
    };

    isAdminUser(){
        return this.get('id') === 1;
    }

    static buildUserCollection(): Collection<User, UserProps>{
        return new Collection<User, UserProps>(
            rootUrl,
            (json: UserProps):User => {
                return User.buildUser(json);
            }
        );
    }

    setRandomAge = (): void => {
        this.set({
            age: Math.round(Math.random()* 100)
        });
        this.trigger('change');
    }
}
