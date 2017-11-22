import { IdentityDB } from "../dbo/identityDB";
import { IdentityModel, ClaimModel } from "../dbo/identityModel";
import { PasswordHasher } from '../services/passwordHasher';
(async () => {
    // Just adds some users to the db.
    let db = new IdentityDB();
    let hasher = new PasswordHasher();

    let users = [
        {
            username: "admin",
            password: "password",
            claims: [ { key: "fullname", value: "administrator" } ]
        },
        {
            username: "userone",
            password: "password",
            claims: [ { key: "fullname", value: "regularuser" } ]
        }
    ] as Array<IdentityModel>;

    for (let user of users) {
        user.password = hasher.hash(user.password, user.username);
        let dbuser = await db.findByUsername(user.username);
        if (!dbuser) {
            let s = db.create(user);
            await s.save();
            console.log(`Created user '${s.username}'.`);
        }
        else {
            console.log(`User '${user.username}' already exists.`);
        }
    }

    db.close();
})();
