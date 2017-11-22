import { IdentityController } from '../controllers/identityController';
import { IdentityDB } from '../dbo/identityDB';

// This shit hooks up the 'app' from express with some routes
// that map to controller methods. Nothing too heavy.
export class Router {

    private readonly controller: IdentityController;
    private readonly identitydb: IdentityDB;

    constructor() {
        this.identitydb = new IdentityDB();
        this.controller = new IdentityController(this.identitydb);
    }

    public applyRoutes(app: any) {
        app.route('/login')
            .post((req: any, res: any) => {
                return this.controller.login(req, res);
            });
    }

}