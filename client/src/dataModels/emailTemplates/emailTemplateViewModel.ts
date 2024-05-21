import { EntityViewModel } from "../entityViewModel";

export interface EmailTemplateViewModel extends EntityViewModel {
    subject: string,
    content: string
}