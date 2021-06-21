import './App.css';

import React, {useEffect, useState} from 'react';
import { getDatasets } from './api/api';

import Dataset from './dataset/Dataset';

function App() {

  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    getDatasets().then(response => {
      setDatasets(response);
      setLoading(false);
    }).catch((error) => {
      // Normally one could handle errors here
      alert(`Error: ${error}`);
    });;
  }, []);

  return (
    loading ?
      <p>Loading data</p>
    :
      <>
        {datasets.map(dataset => <Dataset data={dataset} key={dataset.dataset_id} />)}
      </>
  );
}

export default App;
