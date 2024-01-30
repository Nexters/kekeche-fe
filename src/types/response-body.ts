export interface ResponseBody<T> {
    code: number;
    message: string;
    data: T;
}
