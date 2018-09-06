export class users {
    _id: String;
    name: String;
    email: String;
    password: String;

    constructor(id: String, name: String, email: String, password: String) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    get gName() {
        return this.name;
    }

    set sName(name) {
        this.name = name;
    }

}
