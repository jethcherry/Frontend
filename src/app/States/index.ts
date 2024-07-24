import { AuthInterface } from "./Reducers/auth.reducer";
import { IncidentInterface } from "./Reducers/Incidence.reducer";

export interface AppState
{
    
    auth:AuthInterface
    incident:IncidentInterface

    

}