import { EntityViewModel } from "../entityViewModel";

export interface MailingAccountViewModel extends EntityViewModel {
    name: string,
    email: string,
    picture: string
}