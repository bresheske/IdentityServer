import { IdentityDB } from "../dbo/identityDB";
import { IdentityModel, ClaimModel } from "../dbo/identityModel";
(async () => {
    // Runs some installation scripts for the database.
    let db = new IdentityDB();

    let all = await db.getAll();
    for (let identity of all) {
        await identity.remove();
        console.log(`Removed user: ${identity.username}`);
    }

    db.close();
})();
