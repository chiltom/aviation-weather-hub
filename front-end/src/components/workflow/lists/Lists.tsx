import { ReactElement, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import {
  createList,
  getAllLists,
  updateAList,
  deleteAList,
} from "../../../utilities/lists/listUtilities";
import { List } from "../../../types/listTypes";
import { ContextType } from "../../../types/userTypes";
import Tasks from "./Tasks";

const Lists: React.FC<ContextType> = ({ theme }: ContextType): ReactElement => {
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
   * This function handles the selection of an accordion item, setting the active
   * key as the accordion selected. If the current accordion matches the activeKey,
   * however, the active key is set to null and the accordion is closed.
   * @param key
   */
  const handleSelect = (key: AccordionEventKey): void => {
    key !== null && key ? setActiveKey(key.toString()) : setActiveKey(null);
  };

  /**
   * Handler for create new list button, causes conditional rendering to occur and
   * the text box and save button for a new list input to show.
   */
  const handleCreateListEdit = (): void => {
    setCreateListStatus(true);
  };

  /**
   * This function handles the creation of a new list by submitting the new list
   * name into the createList function.
   *
   * It then awaits the completion of creating a new list and sets the
   * createListName state back to null.
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
   * This function takes a list update event and attempts to use the updateAList
   * method to update the list.
   *
   * If the request is successful, the lists are mapped over and if a previous
   * list's id matches the updated list's id, it is replaced with the updated List object.
   * All others are replaced with their original List object.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   * @param newName
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
   * This function takes a list's id as its parameter and attempts to use the
   * deleteAList method to delete the list.
   *
   * If the request is successful, the previous lists are mapped over and if the
   * deleted list's id matches a list id in the previous lists, it is filtered out.
   * Otherwise, the remaining lists are left.
   *
   * If the request is unsuccessful, nothing happens.
   * @param listId
   */
  const handleListDelete = async (listId: number): Promise<void> => {
    const success: boolean = await deleteAList(listId);
    if (success) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    }
  };

  /**
   * Function that handles the editing of a list name and attaches it to a button.
   *
   * If the button is clicked, it sets the edit list id state to the current list's
   * id and sets the input box's value to the current list's name. It then allows
   * the user to edit the list's name and submit a new one.
   * @param listId
   * @param currentName
   */
  const handleEditListName = (listId: number, currentName: string): void => {
    setEditListId(listId);
    setNewListName(currentName);
  };

  /**
   * This function handles the submission of the editing of a list's name.
   *
   * If the name is not empty and exists, the function then awaits the update of
   * the list's name by the handleListUpdate method above and then sets the edit
   * list id value to null so no list is editable again.
   * @param listId
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

  // TODO: Figure out why accordion item keeps opening and closing when typing in
  // new list name
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
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="form-control flex-grow mr-2"
                    />
                    <Button
                      onClick={() => handleSubmitListName(list.id)}
                      variant="primary"
                      size="sm"
                    >
                      Save
                    </Button>
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
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                      >
                        Rename List
                      </Button>
                      <Button
                        onClick={() => handleListDelete(list.id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete List
                      </Button>
                    </div>
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="d-flex flex-column">
                <Tasks list={list} setLists={setLists} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {createListStatus === false ? (
          <Button
            onClick={() => handleCreateListEdit()}
            variant="primary"
            size="sm"
            className="w-25"
          >
            Create New List
          </Button>
        ) : (
          <div className="flex items-center d-flex">
            <input
              type="text"
              value={createListName}
              onChange={(e) => setCreateListName(e.target.value)}
              className="form-control flex-grow mr-2"
            />
            <Button
              onClick={() => handleCreateListSubmit()}
              variant="primary"
              size="sm"
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Lists;
