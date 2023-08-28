import HttpRequest from "../helpers/HttpRequest";
import Response from "../utils/class";

const formatSQL = async (sql, type = "Default") => {
    try {
        const data = await HttpRequest.post(`/format/${type}`, sql);
        return new Response(data, true);
    } catch (error) {
        return new Response("", false);
    }
};

export default formatSQL;
