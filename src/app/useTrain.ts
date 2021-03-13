import { useState, useEffect } from "react";
import { getTrains, getTrainLineList } from "./api";
import { ITrain, ITrainLine, IFilters } from "./types";

const initFilters: IFilters = {
    CarCount: 0,
    LineCode: "",
    ServiceType: "",
};

const useTrain = () => {
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [lineList, setLineList] = useState<ITrainLine[]>([]);
    const [filteredTrains, setfilteredTrains] = useState<ITrain[]>([]);
    const [filters, setFilters] = useState<IFilters>(initFilters);

    const updateTrains = () => {
        getTrains().then((data) => setTrains(data));
    };

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
        // for filtering
        let filtered = trains;
        (Object.keys(filters) as Array<keyof IFilters>).forEach(
            (filter) =>
                (filtered = filtered.filter((train) => {
                    return (
                        !filters[filter] || train[filter] === filters[filter]
                    );
                }))
        );
        setfilteredTrains(filtered);
    }, [trains, filters]);

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
