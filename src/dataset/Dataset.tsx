import React, {useEffect, useState} from 'react';
import { Dataset } from '../api/api-definition';
import DatasetKeys from './DatasetKeys';
import DatasetCategories from './DatasetCategories';

const Dataset: React.FC<{data: Dataset}> = (props) => {
  
  let {stats, dataset_id} = props.data;
  const [expanded, setExpanded] = useState(false);
  const [showTab, setShowTab] = useState(stats.keys.length ? 'keys' : 'categories');

  return <div className="dataset">
    <h1 onClick={() => setExpanded(!expanded)}>{props.data.name}</h1>

    {expanded &&
      <div className="dataset-stats">
        <p><strong>Row count: {stats.row_count}</strong></p>

          <div className="dataset-toggle-stats">
            {stats.keys.length > 0 && 
              <p onClick={() => setShowTab('keys')} className={showTab === 'keys' ? 'active' : ''}>Keys</p>
            }

            {stats.categories.length > 0 &&
              <p onClick={() => setShowTab('categories')} className={showTab === 'categories' ? 'active' : ''}>Categories</p>
            }
          </div>

        {showTab === 'keys' ?
          <DatasetKeys datasetId={dataset_id} stats={stats} />
        :
          <DatasetCategories datasetId={dataset_id} stats={stats} />
        }
        
      </div>
    }
  </div>;
};

export default Dataset;
