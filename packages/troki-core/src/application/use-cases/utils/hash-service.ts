export interface IHashService {
    hash(value: string): Promise<string>;
    compare(value: string, passwordhashed: string): Promise<boolean>;
}
