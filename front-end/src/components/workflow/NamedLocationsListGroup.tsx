import { ReactElement, useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import {
  getAllNamedLocations,
  createNamedLocation,
  updateANamedLocation,
  deleteANamedLocation,
} from "../../utilities/locations/namedLocationUtilities";
import { NamedLocation } from "../../types/locationTypes";
import { ContextType } from "../../types/userTypes";
import { useWeather } from "../../providers/WeatherContextProvider";
import { WeatherContextType } from "../../types/weatherTypes";

/**
 * @description Maps out the User's NamedLocations in a bootstrap ListGroup
 * and contains handlers for CRUD capability on the NamedLocations.
 *
 * @param {string} theme The theme set in localStorage to style the page
 * accordingly.
 *
 * @returns {ReactElement} ListGroup containing the User's NamedLocations.
 */
const NamedLocationsListGroup: React.FC<ContextType> = ({
  theme,
}: ContextType): ReactElement => {
  const [namedLocations, setNamedLocations] = useState<NamedLocation[]>([]);
  const [editNamedLocationCity, setEditNamedLocationCity] = useState<
    string | null
  >(null);
  const [newNamedLocationCity, setNewNamedLocationCity] = useState<string>("");
  const [newNamedLocationCountry, setNewNamedLocationCountry] =
    useState<string>("");
  const [createNamedLocationStatus, setCreateNamedLocationStatus] =
    useState<boolean>(false);
  const [createNamedLocationCity, setCreateNamedLocationCity] =
    useState<string>("");
  const [createNamedLocationCountry, setCreateNamedLocationCountry] =
    useState<string>("");
  const {
    setMetarLatitude,
    setMetarLongitude,
    setTafLatitude,
    setTafLongitude,
  }: WeatherContextType = useWeather();

  /**
   * Fetches all of the User's named locations on mount.
   */
  useEffect(() => {
    const fetchNamedLocations = async (): Promise<void> => {
      const fetchedNamedLocations: NamedLocation[] | null =
        await getAllNamedLocations();
      if (fetchedNamedLocations) {
        setNamedLocations(fetchedNamedLocations);
      }
    };
    fetchNamedLocations();
  }, []);

  /**
   * @description Handles the selection of a NamedLocation and passes it
   * up to the WeatherProvider to gather METAR data.
   *
   * @param {string} latitude - The latitude of the NamedLocation.
   * @param {string} longitude - The longitude of the NamedLocation.
   */
  const handleSelectMetarLocation = (
    latitude: string,
    longitude: string
  ): void => {
    setMetarLatitude(() => latitude);
    setMetarLongitude(() => longitude);
  };

  /**
   * @description Handles the selection of a NamedLocation and passes it
   * up to the WeatherProvider to gather TAF data.
   *
   * @param {string} latitude - The latitude of the NamedLocation.
   * @param {string} longitude - The longitude of the NamedLocation.
   */
  const handleSelectTafLocation = (
    latitude: string,
    longitude: string
  ): void => {
    setTafLatitude(() => latitude);
    setTafLongitude(() => longitude);
  };

  /**
   * @description Handles the event of clicking the button to create a new
   * NamedLocation.
   */
  const handleCreateNamedLocationEdit = (): void => {
    setCreateNamedLocationStatus(true);
  };

  /**
   * @description Handles the submission to create a new NamedLocation.
   *
   * This function is wrapped by the useCallback hook to cache it until
   * the dependencies have changed.
   */
  const handleCreateNamedLocationSubmit =
    useCallback(async (): Promise<void> => {
      if (
        createNamedLocationCity.trim() !== "" &&
        createNamedLocationCity &&
        createNamedLocationCountry.trim() !== "" &&
        createNamedLocationCountry
      ) {
        const newNamedLocation: NamedLocation | null =
          await createNamedLocation(
            createNamedLocationCity,
            createNamedLocationCountry
          );
        if (newNamedLocation) {
          setNamedLocations((prevNamedLocations) =>
            prevNamedLocations.concat(newNamedLocation)
          );
        }
        setCreateNamedLocationCity("");
        setCreateNamedLocationCountry("");
        setCreateNamedLocationStatus(false);
      }
    }, [createNamedLocationCity, createNamedLocationCountry]);

  /**
   * @description Handles the event of requesting to edit a NamedLocation.
   *
   * @param {string} city The city of the NamedLocation.
   * @param {string} currCity The current city value of the NamedLocation.
   * @param {string} currCountry The current country value of the NamedLocation.
   */
  const handleEditNamedLocationUpdate = (
    city: string,
    currCity: string,
    currCountry: string
  ): void => {
    setEditNamedLocationCity(city);
    setNewNamedLocationCity(currCity);
    setNewNamedLocationCountry(currCountry);
  };

  /**
   * @description Handles the submission of the update of a NamedLocation to
   * the handleNamedLocationUpdate function.
   *
   * This function is wrapped by the useCallback hook to cache it until
   * the dependencies have changed.
   *
   * @param {string} city The city of the NamedLocation.
   * @param {string} country The country of the NamedLocation.
   */
  const handleSubmitNamedLocationUpdate = useCallback(
    async (city: string, country: string): Promise<void> => {
      if (
        newNamedLocationCity.trim() !== "" &&
        newNamedLocationCity &&
        newNamedLocationCountry.trim() !== "" &&
        newNamedLocationCountry
      ) {
        await handleNamedLocationUpdate(
          city,
          country,
          newNamedLocationCity,
          newNamedLocationCountry
        );
        setEditNamedLocationCity(null);
      }
    },
    [newNamedLocationCity, newNamedLocationCountry]
  );

  /**
   * @description Handles the submission of a NamedLocation update.
   *
   * @param {string} city The current city of the NamedLocation.
   * @param {string} country The current country of the NamedLocation.
   * @param {string} newCity The new city of the NamedLocation.
   * @param {string} newCountry The new country of the NamedLocation.
   */
  const handleNamedLocationUpdate = async (
    city: string,
    country: string,
    newCity: string,
    newCountry: string
  ): Promise<void> => {
    const updatedNamedLocation: NamedLocation | null =
      await updateANamedLocation(city, country, newCity, newCountry);
    if (updatedNamedLocation) {
      setNamedLocations((prevNamedLocations) =>
        prevNamedLocations.map((namedLocation) =>
          namedLocation.city === city && namedLocation.country === country
            ? updatedNamedLocation
            : namedLocation
        )
      );
    }
  };

  /**
   * @description Handles the deletion of a NamedLocation.
   *
   * @param {string} city The current city of the NamedLocation.
   */
  const handleNamedLocationDelete = async (city: string): Promise<void> => {
    const success: boolean = await deleteANamedLocation(city);
    if (success) {
      setNamedLocations((prevNamedLocations) =>
        prevNamedLocations.filter(
          (namedLocation) => namedLocation.city !== city
        )
      );
    }
  };

  return (
    <>
      <ListGroup className="h-100" data-bs-theme={theme}>
        <ListGroup.Item className="d-flex justify-content-center align-items-center">
          <h4>Cities</h4>
        </ListGroup.Item>
        {namedLocations.map((namedLocation) => (
          <ListGroup.Item
            key={namedLocation.city}
            className="d-flex justify-content-between align-items-center"
          >
            {editNamedLocationCity === namedLocation.city ? (
              <div className="d-flex flex-grow-1 justify-content-between">
                <InputGroup>
                  <InputGroup.Text>City</InputGroup.Text>
                  <input
                    type="text"
                    value={newNamedLocationCity}
                    onChange={(e) => setNewNamedLocationCity(e.target.value)}
                    className="form-control"
                  />
                  <InputGroup.Text>Country</InputGroup.Text>
                  <input
                    type="text"
                    value={newNamedLocationCountry}
                    onChange={(e) => setNewNamedLocationCountry(e.target.value)}
                    className="form-control"
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      handleSubmitNamedLocationUpdate(
                        namedLocation.city,
                        namedLocation.country
                      )
                    }
                    size="sm"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setEditNamedLocationCity(null)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </InputGroup>
              </div>
            ) : (
              <>
                <div>
                  <strong className="named-location-city-name">
                    {namedLocation.city}
                  </strong>{" "}
                  - {namedLocation.country}
                </div>
                <div className="d-flex flex-wrap">
                  <Button
                    onClick={() =>
                      handleSelectMetarLocation(
                        namedLocation.latitude,
                        namedLocation.longitude
                      )
                    }
                    variant="outline-primary"
                    size="sm"
                  >
                    METAR
                  </Button>
                  <Button
                    onClick={() =>
                      handleSelectTafLocation(
                        namedLocation.latitude,
                        namedLocation.longitude
                      )
                    }
                    variant="outline-primary"
                    size="sm"
                    className="mx-1"
                  >
                    TAF
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mx-1 edit-named-location-button"
                    onClick={() =>
                      handleEditNamedLocationUpdate(
                        namedLocation.city,
                        namedLocation.city,
                        namedLocation.country
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      handleNamedLocationDelete(namedLocation.city)
                    }
                    className="named-location-delete"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
        {createNamedLocationStatus ? (
          <ListGroup.Item className="d-flex">
            <InputGroup>
              <InputGroup.Text>City</InputGroup.Text>
              <input
                type="text"
                value={createNamedLocationCity}
                onChange={(e) => setCreateNamedLocationCity(e.target.value)}
                className="form-control mr-2"
                placeholder="New City"
              />
              <InputGroup.Text>Country</InputGroup.Text>
              <input
                type="text"
                value={createNamedLocationCountry}
                onChange={(e) => setCreateNamedLocationCountry(e.target.value)}
                className="form-control mr-2"
                placeholder="New Country Abbretviation"
              />
              <Button
                variant="outline-primary"
                onClick={handleCreateNamedLocationSubmit}
                size="sm"
              >
                Create
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => setCreateNamedLocationStatus(false)}
                size="sm"
              >
                Cancel
              </Button>
            </InputGroup>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>
            <Button
              variant="outline-primary"
              onClick={handleCreateNamedLocationEdit}
            >
              Add New Location
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default NamedLocationsListGroup;
