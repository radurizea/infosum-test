import React from 'react';
import { DatasetDescription } from '../api/api-definition';
import DatasetChart from './DatasetChart';

const DatasetKeys: React.FC<{datasetId: string, stats: DatasetDescription}> = (props) => {

    const {datasetId, stats} = props;
    const rowCount = parseInt(stats.row_count);
    const chartData = [];

    stats.keys.map(key => {
        const distinctRows = key.distinct >= 0 ? key.distinct : Math.round(Math.abs(key.distinct) * rowCount);
        const nullRows = Math.round(key.null_fraction * rowCount);
        const duplicateRows = rowCount - nullRows - distinctRows;
        chartData.push({label: key.label, nullRows: nullRows, distinctRows: distinctRows, duplicateRows: duplicateRows});
    })


    return (
        <div className="dataset-keys">
            <DatasetChart chartId={datasetId} data={chartData} />
        </div>
    )
}

export default DatasetKeys;