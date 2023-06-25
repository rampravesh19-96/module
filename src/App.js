import React from 'react';
import data from './data';
import Table from './Table';
import Mytable from './DataTable';






const App = () => {
  return (
    <div className="App">
      <header></header>
      <Mytable data={data} itemsPerPage={10} />
    </div>
  );
};

export default App;
