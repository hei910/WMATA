import { useEffect } from "react";
import useTrain from "./useTrain";
import "./App.css";
import Train from "./componenets/Train";
import Filters from "./componenets/Filters";

// As a user I'd like to be able to see all the trains!
// As a user I'd like to be able to filter by train line color.
// As a user I'd like to be able to filter by different service types.
// As a user I'd like to be able to filter by car count.
// As a user I'd like to be able to visually distinguish trains on different colored lines from each other.
// As a user I'd like to be able to visually distinguish between different car counts.
// As a user I'd like to be able to distinguish trains by different service types.
// As a user I'd like to see the page automatically update as the trains' positions update.

const REFRESH_DATA_TIME = 10000;

function App() {
    const {
        trains,
        updateTrains,
        filteredTrains,
        lineList,
        filters,
        setFilters,
        clearFilters,
    } = useTrain();

    useEffect(() => {
        let timeout = setTimeout(() => {
            updateTrains();
        }, REFRESH_DATA_TIME);

        return () => {
            clearTimeout(timeout);
        };
    }, [trains, updateTrains]);

    return (
        <div className="App">
            <h2>
                <u>Washington Metropolitan Trains!</u>
            </h2>
            <div>
                <small>
                    The trains' information updates every 10 seconds...
                </small>
            </div>
            <Filters
                lineList={lineList}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />
            <div className="trains">
                {filteredTrains.length ? (
                    filteredTrains.map(
                        ({ TrainId, CarCount, LineCode, ServiceType }) => (
                            <Train
                                key={TrainId}
                                id={TrainId}
                                lineCode={LineCode}
                                count={CarCount}
                                service={ServiceType}
                            />
                        )
                    )
                ) : (
                    <div className="empty">There is no result... : (</div>
                )}
            </div>
        </div>
    );
}

export default App;
