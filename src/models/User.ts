import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';

export interface UserProps {
    name?: string;
    age?: number;
    id?:number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps>{
    static build(attrs: UserProps){
        return new User(new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync(rootUrl));
    }
}
