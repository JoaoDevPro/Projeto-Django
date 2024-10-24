import React from 'react';
import RiscoList from './RiscoList';
import SolucaoList from './SolucaoList';
import Sidebar from './Sidebar'

function App() {
    return (
        <div className="app">
            
            <Sidebar/>
            <RiscoList />
            
        </div>
            
    );
}

export default App;
