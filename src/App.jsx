import { useEffect, useState } from 'react';
import './App.css';

const initialData = [
  {
    equipment: 'DC1234A',
    location: 'WB',
    // date: '2023-10-15',
  },
  {
    equipment: 'DC5678B',
    location: 'TA',
    // date: '2023-11-12',
  },
  {
    equipment: 'TM4321C',
    location: 'WB',
    // date: '2023-10-15',
  },
  {
    equipment: 'JH8765D',
    location: 'TB',
    // date: '2023-10-08',
  },
];

function App() {
  const [inventory, setInventory] = useState(initialData);

  const filteredLoc = [...new Set(inventory.map((item) => item.location))];
  console.log('current filtered locations are ', filteredLoc);

  function handleAddItems(item) {
    console.log('adding ', item);
    setInventory((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(equipment) {
    console.log('deleting ', equipment);
    setInventory((inventory) =>
      inventory.filter((item) => item.equipment !== equipment)
    );
  }

  useEffect(() => {
    console.log('inventory changes: ', inventory);
    inventory.forEach((item) => {
      console.log(item);
    });
  }, [inventory]);

  return (
    <>
      <div>
        <h2>Inventory</h2>
        <div className="container">
          <div className="categories">
            {filteredLoc.map((loc) => (
              <div key={loc}>
                <h3>{loc}</h3>
                {inventory
                  .filter((item) => item.location == loc)
                  .map((equip) => (
                    <li key={equip.equipment}>{equip.equipment}</li>
                  ))}
              </div>
            ))}
          </div>

          <ul>
            {inventory.map((item) => (
              <Item
                item={item}
                key={item.equipment}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </ul>
        </div>
      </div>

      <Form onAddItems={handleAddItems} />
    </>
  );
}

function Form({ onAddItems }) {
  const [equipment, setEquipment] = useState('');
  const [location, setLocation] = useState('TA');

  function handleSubmit(e) {
    e.preventDefault();

    if (!equipment) return;

    const newEquipment = { equipment, location };
    console.log(newEquipment);

    onAddItems(newEquipment);

    setEquipment('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enter equipment</h3>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="TB">TB</option>
        <option value="TA">TA</option>
        <option value="PM">PM</option>
        <option value="WB">WB</option>
        <option value="VB">VB</option>
      </select>
      <input
        type="text"
        placeholder="Equipment number"
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <h3>{item.equipment}</h3>
      <p>{item.location}</p>
      <p>{item.date}</p>
      <button onClick={() => onDeleteItem(item.equipment)}>Delete</button>
    </li>
  );
}

export default App;
