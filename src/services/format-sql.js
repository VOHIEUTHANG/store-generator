import { PromptFormatRequest } from "../helpers/http-request";
import Response from "../utils/class";

const formatSQL = async (sql, type = "Default") => {
  try {
    const data = await PromptFormatRequest.post(`/format/${type}`, sql);
    return new Response(data, true);
  } catch (error) {
    return new Response("", false);
  }
};

export default formatSQL;
