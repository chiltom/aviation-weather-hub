/**
 * @description The List interface defines the properties of a List.
 *
 * @property {number} id - List's id.
 * @property {string} name - List's name.
 * @property {boolean} completed - List's completion status.
 * @property {Task[]} tasks - The array of Tasks associated with the List.
 */
export interface List {
  id: number;
  name: string;
  completed: boolean;
  tasks: Task[];
}

/**
 * @description The Task interface defines the properties of a Task.
 *
 * @property {number} id - Task's id.
 * @property {number} list - Parent List's id.
 * @property {string} name - Task's name.
 * @property {boolean} completed - Task's completion status.
 */
export interface Task {
  id: number;
  list: number;
  name: string;
  completed: boolean;
}

/**
 * @description Interface for passing down props from parent ListAccordion
 * component to child TasksLists component
 *
 * @prop {List} list - The List that the Tasks belong to.
 * @prop {React.Dispatch<React.SetStateAction<List[]>>} setLists - Setter for lists state.
 */
export interface TasksProps {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}
