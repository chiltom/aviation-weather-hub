import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
// All list related utility functions

/**
 * The Task interface defines the properties of a Task, which
 * consist of a name and completion status. The task is then attached
 * to a parent list, with a reinforced relationship in the server and
 * database using a foreign key relationship. The task holds all relevant
 * information from the server.
*/
export interface Task {
    name: string,
    completed: boolean
}

/**
 * The List interface defines the properties of a List,
 * which consist of a name, an array of tasks, and completion
 * status, effectively holding all relevant information from
 * the server.
 */
export interface List {
    name: string,
    tasks: Task[],
    completed: boolean
}

// export const createList = async (
//     name: 
// )
