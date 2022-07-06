import { AuthTokenStorage } from "../auth/AuthTokenStorage";
import { OpenAPI } from "./service";
import { config } from "config";

OpenAPI.TOKEN = async () => (await AuthTokenStorage.get()) || "";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.BASE = config.backendUrl;
