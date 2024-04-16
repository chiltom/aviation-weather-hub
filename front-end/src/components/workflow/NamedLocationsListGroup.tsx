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
   * Handles the selection of a named location and passes it up to the weather provider
   * to gather METAR data.
   * @param latitude
   * @param longitude
   */
  const handleSelectMetarLocation = (
    latitude: string,
    longitude: string
  ): void => {
    setMetarLatitude(() => latitude);
    setMetarLongitude(() => longitude);
  };

  /**
   * Handles the selectino of a named location and passes it up to the weather provider
   * to gather TAF data.
   * @param latitude
   * @param longitude
   */
  const handleSelectTafLocation = (
    latitude: string,
    longitude: string
  ): void => {
    setTafLatitude(() => latitude);
    setTafLongitude(() => longitude);
  };

  /**
   * useEffect hook to fetch all named locations upon initial render of the component
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
   * Handler for the create new named location button
   */
  const handleCreateNamedLocationEdit = (): void => {
    setCreateNamedLocationStatus(true);
  };

  /**
   * This function handles the creation of a new named location by submitting
   * the named location city and country into the createNamedLocation function.
   *
   * It then awaits the completion of creating a new named location and sets the
   * createNamedLocationCity and createNamedLocationCountry back to null.
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
   * Function that handles the editing of a namedLocation's city and country and
   * attaches it to a button.
   *
   * If the button is clicked, it sets the editNamedLocationCity state to the current
   * namedLocation's city and sets the input boxes' value to the current namedLocation's
   * city and country. It then allows the user to edit the namedLocation's city and country
   * and submit a new set
   * @param city
   * @param currCity
   * @param currCountry
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
   * This function handles the submission of the editing of a namedLocation.
   *
   * If the name is not empty and exists, as well as the country, the function
   * then awaits the update of the attributes by the handleNamedLocationUpdate method
   * above and then sets the editNamedLocationCity value back to null so it is no
   * longer editable again.
   * @param city
   * @param country
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
   * This function takes a named location update event and attempts to use the updateANamedLocation
   * method to update the named location.
   *
   * If the request is successful, the namedLocations are mapped over and if a previous
   * namedLocation's city name matches the updated namedLocation's city name, and
   * the namedLocation's country code matches the updated namedLocation's country code
   * it is replaced with the update namedLocation object.
   *
   * If the request is unsuccessful, nothing happens.
   * @param city
   * @param country
   * @param newCity
   * @param newCountry
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
   * This function takes a named location's city name as its parameter and attempts to
   * use the deleteANamedLocation method to delete the namedLocation.
   *
   * If the request is successful, the previous namedLocations are mapped over and
   * if the deleted namedLocation's city name matches a namedLocation's city name in the
   * previous namedLocations, it is filtered out. Otherwise, the remaining namedLocations
   * are left.
   *
   * If the request is unsuccessful, nothing happens.
   * @param city
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
