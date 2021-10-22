import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useDragging from './hooks/useDragging';
import Draggable from './component/draggable';

function App() {
  const [items, setItems] = useState([{ text: 'New', x: 250, y: 250 }]);

  const handleTextInput = (item, value) => {
    item.text = value;
    setItems([...items]);
  };

  const handleVisionInput = (item, value) => {
    item.x = parseFloat(value) * 5;
    setItems([...items]);
  };

  const handleAbility = (item, value) => {
    item.y = parseFloat(value) * 5;
    setItems([...items]);
  };

  const handleAddButton = () => {
    setItems([...items, { text: 'New', x: 250, y: 250, draggedY: 250, draggedX: 250 }]);
  };

  const handleDeleteButton = (item) => {
    item.deleted = true;
    setItems([...items]);
  };

  const renderItems = () => {
    return items.map((item, i) => (
      <Draggable
        deleted={item.deleted}
        key={i}
        text={item.text}
        posX={item.x}
        posY={item.y}
        onMove={(x, y) => {
          item.draggedX = x;
          item.draggedY = y;
          setItems([...items]);
        }}
      />
    ));
  };

  const renderControls = () => {
    return items
      .filter((el) => !el.deleted)
      .map((item, i) => (
        <div key={i} className='control-container'>
          <input
            className='control'
            value={item.text}
            onChange={({ target }) => handleTextInput(item, target.value)}
          />
          <input
            className='control'
            type='number'
            value={item.draggedX / 5}
            onChange={({ target }) => handleVisionInput(item, target.value)}
          />
          <input
            className='control'
            type='number'
            value={item.draggedY / 5}
            onChange={({ target }) => handleAbility(item, target.value)}
          />
          <button className='control' onClick={() => handleDeleteButton(item)}>
            Delete
          </button>
        </div>
      ));
  };

  return (
    <div className='App'>
      <div style={{ width: '500px', height: '500px', border: 'solid 1px', margin: '5px' }}>
        <div
          style={{
            width: '0px',
            height: '500px',
            border: 'solid 1px',
            marginLeft: '250px',
            position: 'absolute',
          }}
        />
        <div
          style={{
            width: '500px',
            height: '0px',
            border: 'solid 1px',
            marginTop: '250px',
            position: 'absolute',
          }}
        />

        <div className='area1'>Challengers</div>
        <div className='area2'>Leaders</div>
        <div className='area3'>Niche Players</div>
        <div className='area4'>Visionaries</div>
        {renderItems()}
      </div>

      <div>
        <div style={{ textAlign: 'left' }}>
          <button onClick={handleAddButton}>Add</button>
        </div>
        <div className='control-container'>
          <div className='control-header'>Label</div>
          <div className='control-header'>Vision</div>
          <div className='control-header'>Ability</div>
          <div className='control-header'>Delete</div>
        </div>
        <div>{renderControls()}</div>{' '}
      </div>
    </div>
  );
}

export default App;
