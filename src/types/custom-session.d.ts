import type {AdapterSession, AdapterUser} from "@auth/core/adapters";
import type {Session} from "@auth/core/types";


declare global {
    type cuSession = { user: AdapterUser } & AdapterSession & Session & {
        id_token?: string
    };
}