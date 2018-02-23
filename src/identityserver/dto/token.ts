import { ClaimModel } from "../dbo/identityModel";

export class Token {
    username: string;
    claims: Array<ClaimModel>;
    created: Date;
    expires: Date;
}