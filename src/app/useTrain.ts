import { useState, useEffect, useCallback } from "react";
import { getTrains, getTrainLineList } from "../services/api";

interface IFilters {
    line: string[]
    service: stringp[]
    count: number
}
const initFilters:IFilters = {
    line: [],
    service: [],
    count: 0,
};

const useTrain = () => {
    const [trains, setTrains] = useState([]);
    const [filteredTrains, setfilteredTrains] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [filters, setFilters] = useState(initFilters);

    const updateTrains = useCallback(() => {
        getTrains().then((data) => setTrains(data));
    }, []);
    const updateTrainLineList = () => {
        getTrainLineList().then((data) => setLineList(data));
    };

    useEffect(() => {
        updateTrains();
        updateTrainLineList();
    }, []);

    useEffect(() => {
        let filtered = !!filteredTrains.length ? filteredTrains : trains
        Object.keys(filters).forEach( filter => {
            filtered.filter( train => filter.indexOf(train.LineCode) !== -1)
        })
    }, [trains, filters])

    return {
        trains,
        updateTrains,
        lineList,
        filters,
        setFilters,
    };
};

export default useTrain;
