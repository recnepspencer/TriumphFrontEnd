import { CreateComponent } from "../components/fields/create/create.component";
import { FieldsComponent } from "../components/fields/fields.component";

export const FIELDS_ROUTES = [
  {
    path: '',
    component: FieldsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }
];
