import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';

export class UserService {

    private users: User[] = [
        new User ('James', 'BOND', 'james@bond.fr', 'Wisky', ['Tuer', 'Jouer'])
    ];

    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers();
    }
}