import { useRef } from "react";
import { SetStateAction } from "react";
import { IFilters } from "../../types";
import { ITrainLine } from "../../types";
import "./styles.css";

interface IProps {
    filters: IFilters;
    lineList: ITrainLine[];
    clearFilters: () => void;
    setFilters: React.Dispatch<SetStateAction<IFilters>>;
}

const Filters = (props: IProps) => {
    const { lineList, filters, setFilters, clearFilters } = props;

    const reset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        clearFilters();
    };

    return (
        <div className="filters">
            <LinesFilter
                lineList={lineList}
                filters={filters}
                setFilters={setFilters}
            />
            <ServiceFilter setFilters={setFilters} />
            <CountFilter setFilters={setFilters} />
            <button onClick={reset}>Reset</button>
        </div>
    );
};

interface IProps2 {
    filters: IFilters;
    lineList: ITrainLine[];
    setFilters: React.Dispatch<SetStateAction<IFilters>>;
}

const LinesFilter = (props: IProps2) => {
    const { lineList, filters, setFilters } = props;

    const updateFilters = (LineCode: string) => {
        setFilters((prev) => ({
            ...prev,
            LineCode: LineCode === prev.LineCode ? "" : LineCode,
        }));
    };

    return (
        <div className="filter">
            <div className="label">Lines: </div>
            {!!lineList &&
                lineList.map(({ DisplayName, LineCode }) => {
                    return (
                        <div
                            key={LineCode}
                            className={`filter-line ${LineCode}${
                                filters.LineCode === LineCode ? " active" : ""
                            }`}
                            style={{
                                color: DisplayName,
                            }}
                            onClick={() => updateFilters(LineCode)}
                        >
                            <span>{LineCode}</span>
                        </div>
                    );
                })}
        </div>
    );
};

interface IProps3 {
    setFilters: React.Dispatch<SetStateAction<IFilters>>;
}
const serviceFilterList = ["NoPassengers", "Normal", "Special", "Unknown"];

const ServiceFilter = (props: IProps3) => {
    const updateFilters = (ServiceType: string) => {
        props.setFilters((prev) => ({
            ...prev,
            ServiceType,
        }));
    };

    return (
        <div className="filter">
            <div className="label">Service: </div>
            <select
                name="serviceType"
                id="serviceType"
                onChange={(e) => updateFilters(e.target.value)}
            >
                <option value="">- Select -</option>
                {serviceFilterList.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

const CountFilter = (props: IProps3) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const updateFilters = (CarCount: string) => {
        console.log(111, "CarCount", CarCount);
        if (inputRef.current && CarCount === "0") inputRef.current.value = "";

        props.setFilters((prev) => ({
            ...prev,
            CarCount: +CarCount,
        }));
    };

    return (
        <div className="filter">
            <div className="label">Count: </div>
            <input
                ref={inputRef}
                type="number"
                max={10}
                min={0}
                onChange={(e) => updateFilters(e.target.value)}
            />
        </div>
    );
};

export default Filters;
