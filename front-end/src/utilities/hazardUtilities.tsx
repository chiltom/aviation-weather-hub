import { AxiosResponse } from "axios";
import { api } from "./axiosConfig";

export interface Hazard {
  id: number;
  brief: number;
  type: string;
  information: string;
}
