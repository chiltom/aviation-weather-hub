import { ReactElement, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
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

/**
 * @description Maps out the User's Airports in a bootstrap ListGroup and contains
 * handlers for CRUD capability on the Airports.
 *
 * @param {string} theme The theme set in localStorage to style the page accordingly.
 *
 * @returns  {ReactElement} ListGroup containing the User's Airports.
 */
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
   * Fetches all of the User's Airports on mount.
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
   * @description Handles the event of clicking the button to create a new Airport.
   */
  const handleCreateAirportEdit = (): void => {
    setCreateAirportStatus(true);
  };

  /**
   * @description Handles the submission to create a new Airport.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
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
   * @description Handles the event of request to edit an Airport.
   *
   * @param {string} icaoCode The ICAO code of the Airport.
   * @param {string} currIcaoCode The current ICAO code value of the Airport.
   * @param {string} currName The current name value of the Airport.
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
   * @description Handles the submission of the update of an Airport to the
   * handleAirportUpdate function.
   *
   * This function is wrapped by the useCallback hook to cache it until the
   * dependencies have changed.
   *
   * @param {string} icaoCode The ICAO code of the Airport.
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

  /**
   * @description Handles the submission of an Airport update.
   * 
   * @param {string} icaoCode The current ICAO code of the Airport.
   * @param {string} newIcaoCode The new ICAO code of the Airport.
   * @param {string} newAirportName The new name of the Airport.
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
   * @description Handles the deletion of an Airport.
   * 
   * @param {string} icaoCode The current ICAO code of the Airport.
   */
  const handleAirportDelete = async (icaoCode: string): Promise<void> => {
    const success: boolean = await deleteAnAirport(icaoCode);
    if (success) {
      setAirports((prevAirports) =>
        prevAirports.filter((airport) => airport.icaoCode !== icaoCode)
      );
    }
  };

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
                <InputGroup>
                  <InputGroup.Text>ICAO</InputGroup.Text>
                  <input
                    type="text"
                    value={newAirportIcao}
                    onChange={(e) => setNewAirportIcao(e.target.value)}
                    className="form-control"
                  />
                  <InputGroup.Text>Name</InputGroup.Text>
                  <input
                    type="text"
                    value={newAirportName}
                    onChange={(e) => setNewAirportName(e.target.value)}
                    className="form-control"
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => handleSubmitAirportUpdate(airport.icaoCode)}
                    size="sm"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setEditAirportIcao(null)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </InputGroup>
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
                    className="mx-1 edit-airport-button"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleAirportDelete(airport.icaoCode)}
                    className="airport-delete"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
        {createAirportStatus ? (
          <ListGroup.Item>
            <InputGroup>
              <InputGroup.Text>ICAO</InputGroup.Text>
              <input
                type="text"
                value={createAirportIcao}
                onChange={(e) => setCreateAirportIcao(e.target.value)}
                className="form-control mr-2"
                placeholder="New ICAO Code"
              />
              <InputGroup.Text>Name</InputGroup.Text>
              <input
                type="text"
                value={createAirportName}
                onChange={(e) => setCreateAirportName(e.target.value)}
                className="form-control mr-2"
                placeholder="New Airport Name"
              />
              <Button
                variant="outline-primary"
                onClick={handleCreateAirportSubmit}
                size="sm"
              >
                Create
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setCreateAirportStatus(false)}
                size="sm"
              >
                Cancel
              </Button>
            </InputGroup>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>
            <Button variant="outline-primary" onClick={handleCreateAirportEdit}>
              Add New Airport
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default AirportsListGroup;
