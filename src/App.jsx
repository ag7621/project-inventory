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

  const [equipment, setEquipment] = useState('');
  const [location, setLocation] = useState('TA');

  function handleAddItems(item) {
    setInventory((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(equipment) {
    console.log(equipment);
    setInventory((inventory) =>
      inventory.filter((item) => item.equipment !== equipment)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!equipment) return;

    const newEquipment = { equipment, location };
    console.log(newEquipment);

    handleAddItems(newEquipment);

    setEquipment('');
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
        <ul>
          {inventory.map((item) => (
            <li key={item.equipment}>
              <h3>{item.equipment}</h3>
              <p>{item.location}</p>
              <p>{item.date}</p>
              <button onClick={() => handleDeleteItem(item.equipment)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

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
    </>
  );
}

export default App;
