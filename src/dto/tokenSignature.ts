import { ClaimModel } from "../dbo/identityModel";
import { Token } from "./token";

export class TokenSignature {
    identity: Token;
    signature: string;
}