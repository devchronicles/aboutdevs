import * as massive from "massive";

declare module "massive" {
    export interface Table<T> {
        save(data: object): Promise<T[] | T>;
        insert(data: object): Promise<T[] | T>;
        update(dataOrCriteria: object, changesMap?: object): Promise<T[] | T>;
    }
}
