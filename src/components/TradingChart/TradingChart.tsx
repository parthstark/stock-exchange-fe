const TradingChart = ({ name }: { name?: string }) => {
    return (
        <div className="h-full flex items-center justify-center text-gray-500 bg-gray-100">
            <p>{name?.toUpperCase()} Chart Placeholder</p>
        </div>
    );
};

export default TradingChart;
