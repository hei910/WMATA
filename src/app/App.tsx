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

const REFRESH_DATA_TIME = 5000;

function App() {
    const { trains, updateTrains, lineList } = useTrain();

    useEffect(() => {
        let timeout = setTimeout(() => {
            updateTrains();
        }, REFRESH_DATA_TIME);

        return () => {
            clearTimeout(timeout);
        };
    }, [trains]);

    return (
        <div className="App">
            <Filters lineList={lineList} />
            <div className="trains">
                {trains.map(({ TrainId, CarCount, LineCode, ServiceType }) => (
                    <Train
                        id={TrainId}
                        lineCode={LineCode}
                        count={CarCount}
                        service={ServiceType}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
