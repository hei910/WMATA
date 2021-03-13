export interface ITrain {
    TrainId: string;
    CarCount: number;
    LineCode: string | null;
    ServiceType: string;
    [key: string]: any;
}
export interface ITrainLine {
    DisplayName: string;
    LineCode: string;
    [key: string]: any;
}
export interface IFilters {
    CarCount: number;
    LineCode: string;
    ServiceType: string;
}
