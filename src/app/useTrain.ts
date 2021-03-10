import { useState, useEffect, useCallback } from "react";
import {
    getTrains,
    getTrainLineList,
    ITrain,
    ITrainLineList,
} from "../services/api";

interface IFilters {
    CarCount: number;
    LineCode: string;
    ServiceType: string;
    [key: string]: any;
}
const initFilters: IFilters = {
    CarCount: 0,
    LineCode: "",
    ServiceType: "",
};

const useTrain = () => {
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [lineList, setLineList] = useState<ITrainLineList[]>([]);
    const [filteredTrains, setfilteredTrains] = useState<ITrain[]>([]);
    const [filters, setFilters] = useState<IFilters>(initFilters);

    const updateTrains = useCallback(() => {
        getTrains().then((data) => setTrains(data));
    }, []);

    const updateTrainLineList = () => {
        getTrainLineList().then((data) => setLineList(data));
    };

    const clearFilters = () => {
        setFilters(initFilters);
    };

    useEffect(() => {
        updateTrains();
        updateTrainLineList();
    }, []);

    useEffect(() => {
        let filtered = !!filteredTrains.length ? filteredTrains : trains;
        Object.keys(filters).forEach((filter) =>
            filtered.filter((train) => train[filter] === filters[filter])
        );
        setfilteredTrains(filtered);
    }, [trains, filters, filteredTrains]);

    return {
        trains,
        filteredTrains,
        updateTrains,
        lineList,
        filters,
        setFilters,
        clearFilters,
    };
};

export default useTrain;
