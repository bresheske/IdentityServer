export class IdentityModel {
    username: string;
    password: string;
    claims: Array<ClaimModel>;
}

export class ClaimModel {
    key: string;
    value: string;
}