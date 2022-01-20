import React, {useState} from 'react';
import './App.css';
import ListProjects from './components/listProjects/listProjects';
import CreateProject from './components/createProjects/createProject';
import {Tab, Tabs} from 'react-materialize';
import Email from './components/email/email';


function App() {
    return (
    <div className="App">
        <Email/>
        <Tabs className="tab-demo z-depth-0 customTabs" scope="tabs-22">
            <Tab active
                 options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                }}
                title="Projects"
            >
                <ListProjects/>
            </Tab>
            <Tab options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                }}
                title="Create Project"
            >
                <CreateProject/>
            </Tab>
        </Tabs>
    </div>
  );
}

export default App;
