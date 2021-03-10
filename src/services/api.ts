const APIKey = "e13626d03d8e4c03ac07f95541b3091b";

export interface ITrain {
    TrainId: string;
    CarCount: number;
    LineCode: string | null;
    ServiceType: string;
    [key: string]: any;
}
export interface ITrainLineList {
    DisplayName: string;
    LineCode: string;
    [key: string]: any;
}

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
        (data): ITrainLineList[] => data.Lines
    );
