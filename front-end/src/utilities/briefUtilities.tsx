import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";
import { Hazard } from "./hazardUtilities";

export interface Brief {
  id: number;
  flight: number;
  surfaceWinds: string;
  flightLevelWinds: string;
  visibility: string;
  skyCondition: string;
  temperature: string;
  altimeterSetting: string;
  briefTime: string;
  voidTime: string;
  hazards: Hazard[];
}
