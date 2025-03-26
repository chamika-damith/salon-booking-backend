export interface UserModel {
    id: string;
    email: string;
    password: string;
    role: "admin" | "user";
}
