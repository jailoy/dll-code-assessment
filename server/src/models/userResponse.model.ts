import { Paging } from "./paging.model";
import { User } from "./user.model"

export type UserResponse = {
    data: User[];
    paging: Paging
}