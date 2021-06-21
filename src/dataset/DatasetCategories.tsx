import React from 'react';
import { DatasetDescription } from '../api/api-definition';
import DatasetChart from './DatasetChart';

const DatasetCategories: React.FC<{datasetId: string, stats: DatasetDescription}> = (props) => {

    const {datasetId, stats} = props;
    const {categories} = stats;
    const rowCount = parseInt(stats.row_count);
    const chartData = [];

    categories.map(category => {
        const {statistics} = category.best_representation;
        const distinctRows = statistics.distinct >= 0 ? statistics.distinct : Math.round(Math.abs(statistics.distinct) * rowCount);
        const nullRows = Math.round(statistics.null_fraction * rowCount);
        const duplicateRows = rowCount - nullRows - distinctRows;
        chartData.push({label: category.name, nullRows: nullRows, distinctRows: distinctRows, duplicateRows: duplicateRows});
    })

    return (
        <div className="dataset-categories">
            <DatasetChart chartId={datasetId} data={chartData} />
        </div>
    )
}

export default DatasetCategories;