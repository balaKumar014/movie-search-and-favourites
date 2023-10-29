export class ServiceResponse<T> {
    public data?: T;
    public error?: any;
    public status?: number;
    public message?: any;
}