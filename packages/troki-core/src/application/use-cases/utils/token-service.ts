export interface ITokenService {
    generateToken(payload: object, expiresIn?: number | string): Promise<string>;
    verifyToken<T>(token: string): Promise<T>;
}
