import { EntityViewModel } from "../entityViewModel";

export interface RecipientGroupViewModel extends EntityViewModel {
  name: string;
  recipients: Array<string>;
}
