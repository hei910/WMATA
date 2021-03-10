const Filters = ({ lineList }: { lineList: any }) => {
    console.log(111, "lineList", lineList);
    return (
        <div>
            <LinesFilter lineList={lineList} />
            <ServiceFilter />
            <CountFilter />
        </div>
    );
};

const LinesFilter = ({ lineList }: { lineList: any }) => {
    return (
        <div>
            Lines:
            {lineList.map(({ DisplayName, LineCode }) => (
                <div
                    className="filter-line"
                    style={{ background: DisplayName }}
                    onClick={() => {}}
                >
                    {LineCode}
                </div>
            ))}
        </div>
    );
};

const ServiceFilter = () => {
    return <div>ServiceFilter</div>;
};

const CountFilter = () => {
    return <div>CountFilter</div>;
};

export default Filters;
