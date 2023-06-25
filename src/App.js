import React from 'react';
import data from './data';
import Table from './Table';
import Mytable from './DataTable';
import Main from './Main';
import Form from './Form';
import MyComponent from './MyComponent';






const App = () => {
  return (
    <div className="App">
      <header></header>
      {/* <Mytable data={data} itemsPerPage={10} /> */}
      {/* <Main/> */}
      <MyComponent/>
    </div>
  );
};

export default App;
