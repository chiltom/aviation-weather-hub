import { ReactElement, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {
  getAllAirports,
  createAirport,
  updateAnAirport,
  deleteAnAirport,
} from "../../utilities/locations/airportUtilities";
import { Airport } from "../../types/locationTypes";
import { ContextType } from "../../types/userTypes";
import { useWeather } from "../../providers/WeatherContextProvider";
import { WeatherContextType } from "../../types/weatherTypes";

const AirportsListGroup: React.FC<ContextType> = ({
  theme,
}: ContextType): ReactElement => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [editAirportIcao, setEditAirportIcao] = useState<string | null>(null);
  const [newAirportName, setNewAirportName] = useState<string>("");
  const [newAirportIcao, setNewAirportIcao] = useState<string>("");
  const [createAirportStatus, setCreateAirportStatus] =
    useState<boolean>(false);
  const [createAirportName, setCreateAirportName] = useState<string>("");
  const [createAirportIcao, setCreateAirportIcao] = useState<string>("");
  const { setMetarIcaoCode, setTafIcaoCode }: WeatherContextType = useWeather();

  /**
   * useEffect hook to fetch all airports upon initial render of the component
   */
  useEffect(() => {
    const fetchAirports = async (): Promise<void> => {
      const fetchedAirports: Airport[] | null = await getAllAirports();
      if (fetchedAirports) {
        setAirports(fetchedAirports);
      }
    };
    fetchAirports();
  }, []);

  /**
   * Handler for create new airport button
   */
  const handleCreateAirportEdit = (): void => {
    setCreateAirportStatus(true);
  };

  /**
   * This function handles the creation of a new aiport by submitting the new airport
   * name and icao code into the createAirport function.
   *
   * It then awaits the completion of creating a new list and sets the createAirportName
   * and createAirportIcao state back to null.
   */
  const handleCreateAirportSubmit = useCallback(async (): Promise<void> => {
    if (
      createAirportName.trim() !== "" &&
      createAirportName &&
      createAirportIcao.trim() !== "" &&
      createAirportIcao
    ) {
      const newAirport: Airport | null = await createAirport(
        createAirportIcao,
        createAirportName
      );
      if (newAirport) {
        setAirports((prevAirports) => prevAirports.concat(newAirport));
      }
      setCreateAirportName("");
      setCreateAirportIcao("");
      setCreateAirportStatus(false);
    }
  }, [createAirportName, createAirportIcao]);

  /**
   * This function takes an airport update event and attempts to use the updateAnAirport
   * method to update the airport.
   *
   * If the request is successful, the airports are mapped over and if a previous airport's
   * icaoCode matches the updated airport's icaoCode, it is replaced with the updated Airport object.
   *
   * If the request is unsuccessful, nothing happens.
   * @param icaoCode
   * @param newIcaoCode
   * @param newAirportName
   */
  const handleAirportUpdate = async (
    icaoCode: string,
    newIcaoCode: string,
    newAirportName: string
  ): Promise<void> => {
    const updatedAirport: Airport | null = await updateAnAirport(
      icaoCode,
      newIcaoCode,
      newAirportName
    );
    if (updatedAirport) {
      setAirports((prevAirports) =>
        prevAirports.map((airport) =>
          airport.icaoCode === icaoCode ? updatedAirport : airport
        )
      );
    }
  };

  /**
   * This function takes an airport's icao code as its parameter and attempts to use the
   * deleteAnAirport method to delete the airport.
   *
   * If the request is successful, the previous airports are mapped over and if the deleted
   * airport's icaoCode matches an airport icaoCode in the previous airports, it is filtered
   * out. Otherwise, the remaining lists are left.
   *
   * If the request is unsuccessful, nothing happens.
   * @param icaoCode
   */
  const handleAirportDelete = async (icaoCode: string): Promise<void> => {
    const success: boolean = await deleteAnAirport(icaoCode);
    if (success) {
      setAirports((prevAirports) =>
        prevAirports.filter((airport) => airport.icaoCode !== icaoCode)
      );
    }
  };

  /**
   * Function that handles the editing of an airport's name and icaoCode and attaches it
   * to a button.
   *
   * If the button is clicked, it sets the editAirportIcao state to the current airport's icao
   * and sets the input boxes' value to the current airport's icaoCode and name. It then allows
   * the user to edit the airport's icaoCode and name and submit a new set.
   * @param icaoCode
   * @param currIcaoCode
   * @param currName
   */
  const handleEditAirportUpdate = (
    icaoCode: string,
    currIcaoCode: string,
    currName: string
  ): void => {
    setEditAirportIcao(icaoCode);
    setNewAirportIcao(currIcaoCode);
    setNewAirportName(currName);
  };

  /**
   * This function handles the submission of the editing of an airport.
   *
   * If the name is not empty and exists, as well as the icaoCode, the function then
   * awaits the update of the attributes by the handleAirportUpdate method above and then
   * sets the editAirportIcao value back to null so it is no longer editable again
   * @param icaoCode
   */
  const handleSubmitAirportUpdate = useCallback(
    async (icaoCode: string): Promise<void> => {
      if (
        newAirportIcao.trim() !== "" &&
        newAirportName.trim() !== "" &&
        newAirportIcao &&
        newAirportName
      ) {
        await handleAirportUpdate(icaoCode, newAirportIcao, newAirportName);
        setEditAirportIcao(null);
      }
    },
    [newAirportIcao, newAirportName]
  );

  return (
    <>
      <ListGroup className="h-100" data-bs-theme={theme}>
        <ListGroup.Item className="d-flex justify-content-center align-items-center">
          <h4>Airports</h4>
        </ListGroup.Item>
        {airports.map((airport) => (
          <ListGroup.Item
            key={airport.icaoCode}
            className="d-flex justify-content-between align-items-center"
          >
            {editAirportIcao === airport.icaoCode ? (
              <div className="d-flex flex-grow-1 justify-content-between">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    value={newAirportIcao}
                    onChange={(e) => setNewAirportIcao(e.target.value)}
                    className="form-control"
                  />
                  <input
                    type="text"
                    value={newAirportName}
                    onChange={(e) => setNewAirportName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <Button
                  variant="outline-success"
                  onClick={() => handleSubmitAirportUpdate(airport.icaoCode)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{airport.icaoCode}</strong> - {airport.name}
                </div>
                <div className="d-flex flex-wrap">
                  <Button
                    variant="outline-primary"
                    onClick={() => setMetarIcaoCode(() => airport.icaoCode)}
                    size="sm"
                  >
                    METAR
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setTafIcaoCode(() => airport.icaoCode)}
                    size="sm"
                    className="mx-1"
                  >
                    TAF
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      handleEditAirportUpdate(
                        airport.icaoCode,
                        airport.icaoCode,
                        airport.name
                      )
                    }
                    className="mx-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleAirportDelete(airport.icaoCode)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
        {createAirportStatus ? (
          <ListGroup.Item className="d-flex">
            <input
              type="text"
              value={createAirportIcao}
              onChange={(e) => setCreateAirportIcao(e.target.value)}
              className="form-control mr-2"
              placeholder="New ICAO Code"
            />
            <input
              type="text"
              value={createAirportName}
              onChange={(e) => setCreateAirportName(e.target.value)}
              className="form-control mr-2"
              placeholder="New Airport Name"
            />
            <Button variant="success" onClick={handleCreateAirportSubmit}>
              Create
            </Button>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>
            <Button variant="primary" onClick={handleCreateAirportEdit}>
              Add New Airport
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default AirportsListGroup;
