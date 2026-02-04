import { createContext } from "react";
import { WebLLMApi } from "./client/webllm";
import { ModelRecord } from "./client/api";
export const WebLLMContext = createContext<WebLLMApi | undefined>(undefined);
