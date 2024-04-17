import { ReactElement, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import {
  createList,
  getAllLists,
  updateAList,
  deleteAList,
} from "../../../utilities/lists/listUtilities";
import { List } from "../../../types/listTypes";
import { ContextType } from "../../../types/userTypes";
import TasksLists from "./TasksLists";

/**
 * @description A component that holds a User's Lists in a bootstrap Accordion
 * structure and contains handlers for CRUD capability on the Lists.
 *
 * @prop {string} theme The User's OS theme.
 *
 * @returns {ReactElement} The ListsAccordion holding a User's Lists.
 */
const ListsAccordion: React.FC<ContextType> = ({
  theme,
}: ContextType): ReactElement => {
  const [lists, setLists] = useState<List[]>([]);
  const [editListId, setEditListId] = useState<number | null>(null);
  const [newListName, setNewListName] = useState<string>("");
  const [createListStatus, setCreateListStatus] = useState<boolean>(false);
  const [createListName, setCreateListName] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async (): Promise<void> => {
      const fetchedLists: List[] | null = await getAllLists();
      if (fetchedLists) {
        setLists(fetchedLists);
      }
    };
    fetchLists();
  }, []);

  /**
   * @description Handles the selection of an accordion item and, if not the current
   * key, sets the activeKey to null. Otherwise, the active key is set to the clicked
   * item.
   *
   * @param {AccordionEventKey} key The key of the Accordion Item.
   */
  const handleSelect = (key: AccordionEventKey): void => {
    key !== null && key ? setActiveKey(key.toString()) : setActiveKey(null);
  };

  /**
   * @description Handles the event of clicking the button to create a new List.
   */
  const handleCreateListEdit = (): void => {
    setCreateListStatus(true);
  };

  /**
   * @description Handles the submission to create a new List.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   */
  const handleCreateListSubmit = useCallback(async (): Promise<void> => {
    if (createListName.trim() !== "" && createListName) {
      const newList: List | null = await createList(createListName);
      if (newList) {
        setLists((prevLists) => prevLists.concat(newList));
      }
      setCreateListName("");
      setCreateListStatus(false);
    }
  }, [createListName]);

  /**
   * @description Handles the event of request to edit a List.
   *
   * @param {number} listId The List's id.
   * @param {string} currentName The current name of the List.
   */
  const handleEditListName = (listId: number, currentName: string): void => {
    setEditListId(listId);
    setNewListName(currentName);
  };

  /**
   * @description Handles the submission of the update of a List to the handleListUpdate
   * function.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {number} listId The List's id.
   */
  const handleSubmitListName = useCallback(
    async (listId: number): Promise<void> => {
      if (newListName.trim() !== "" && newListName) {
        await handleListUpdate(listId, newListName);
        setEditListId(null);
      }
    },
    [newListName]
  );

  /**
   * @description Handles the submission of a List name update.
   *
   * @param {number} listId The List's id.
   * @param {number} newName The new name of the List.
   */
  const handleListUpdate = async (
    listId: number,
    newName: string
  ): Promise<void> => {
    const updatedList: List | null = await updateAList(listId, newName);
    if (updatedList) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === updatedList.id ? updatedList : list
        )
      );
    }
  };

  /**
   * @description Handles the deletion of a List.
   *
   * @param {number} listId The List's id.
   */
  const handleListDelete = async (listId: number): Promise<void> => {
    const success: boolean = await deleteAList(listId);
    if (success) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold my-2 text-center">Lists</h2>
      <div
        data-bs-theme={theme}
        className="border border-secondary d-flex flex-column flex-grow-1 rounded-3 p-0 align-items-end"
      >
        <Accordion
          className="d-flex flex-column flex-grow-1 w-100"
          activeKey={activeKey}
          onSelect={handleSelect}
        >
          {lists.map((list) => (
            <Accordion.Item key={list.id} eventKey={String(list.id)}>
              <Accordion.Header className="flex w-full">
                {editListId === list.id ? (
                  <div className="d-flex flex-grow-1 me-3">
                    <InputGroup>
                      <InputGroup.Text>Name</InputGroup.Text>
                      <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="form-control flex-grow mr-2"
                      />
                      <Button
                        onClick={() => handleSubmitListName(list.id)}
                        variant="outline-primary"
                        size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditListId(null)}
                        variant="outline-danger"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </InputGroup>
                  </div>
                ) : (
                  <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                    {list.completed ? (
                      <h3 className="d-flex align-items-center text-decoration-line-through fw-lighter">
                        {list.name}
                      </h3>
                    ) : (
                      <h3 className="d-flex align-items-center">{list.name}</h3>
                    )}
                    <div className="d-flex align-items-center mx-3">
                      <Button
                        onClick={() => handleEditListName(list.id, list.name)}
                        variant="outline-secondary"
                        size="sm"
                        className="mr-2 rename-list-button"
                      >
                        Rename List
                      </Button>
                      <Button
                        onClick={() => handleListDelete(list.id)}
                        variant="outline-danger"
                        size="sm"
                        className="delete-list"
                      >
                        Delete List
                      </Button>
                    </div>
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="d-flex flex-column">
                <TasksLists list={list} setLists={setLists} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {createListStatus === false ? (
          <Button
            onClick={() => handleCreateListEdit()}
            variant="outline-primary"
          >
            Create New List
          </Button>
        ) : (
          <div className="d-flex align-items-center w-100">
            <InputGroup>
              <InputGroup.Text>Name</InputGroup.Text>
              <input
                type="text"
                value={createListName}
                onChange={(e) => setCreateListName(e.target.value)}
                className="form-control flex-grow mr-2"
              />
              <Button
                onClick={() => handleCreateListSubmit()}
                variant="outline-primary"
                size="sm"
              >
                Save
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setCreateListStatus(false)}
                size="sm"
              >
                Cancel
              </Button>
            </InputGroup>
          </div>
        )}
      </div>
    </>
  );
};

export default ListsAccordion;
