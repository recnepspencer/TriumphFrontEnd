import { CreateComponent } from "../components/organizations/create/create.component";
import { OrganizationsComponent } from "../components/organizations/organizations.component";
import { ShowComponent } from "../components/organizations/show/show.component";

export const ORGANIZATION_ROUTES = [
    {
        path: '',
        component: OrganizationsComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: ':id',
        component: ShowComponent
    }
];
