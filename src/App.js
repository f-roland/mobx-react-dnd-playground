import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext} from 'react-dnd';

import CardsList from './Components/CardsList';
import Bucket from './Components/Bucket';
import Header from "./Components/Header";

import DevTools from 'mobx-react-devtools';

@DragDropContext(HTML5Backend)
class App extends Component {
  render() {
    return (
      <div className='flex flex-auto flex-column p2'>
        <DevTools />
        <Header />
        <div className="flex">
          <Bucket sorted />
          <CardsList />
        </div>
      </div>
    );
  }
}

export default App;
