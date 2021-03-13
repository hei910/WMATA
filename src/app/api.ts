import { ITrain, ITrainLine } from "./types";

const APIKey = "e13626d03d8e4c03ac07f95541b3091b";

const get = (url: string, headers = {}) => {
    return fetch(url, {
        method: "GET",
        headers: {
            api_key: APIKey,
            ...headers,
        },
    }).then((response) => response.json());
};

export const getTrains = () =>
    get(
        "https://api.wmata.com/TrainPositions/TrainPositions?contentType=json"
    ).then((data): ITrain[] => data.TrainPositions);

export const getTrainLineList = () =>
    get("https://api.wmata.com/Rail.svc/json/jLines").then(
        (data): ITrainLine[] => data.Lines
    );
