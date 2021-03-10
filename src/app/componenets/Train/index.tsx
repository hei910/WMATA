import { ReactComponent as IconTrain } from "./train.svg";
import "./styles.css";

interface IProps {
    lineCode: string;
    id: number | string;
    service: string;
    count: number;
}

const Train = ({ lineCode, id, service, count }: IProps) => {
    return (
        <div className={`train ${!!lineCode ? lineCode : "inactive"}`}>
            <div className="id">
                <span>{id || "--"}</span>
            </div>
            <div className="icon">
                <IconTrain />
                {!!count && (
                    <div className="count">
                        <span>{count}</span>
                    </div>
                )}
            </div>
            <div className="service">
                <span>{service && service !== "Unknown" ? service : "--"}</span>
            </div>
        </div>
    );
};

export default Train;
