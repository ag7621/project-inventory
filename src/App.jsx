import { useState } from 'react';
import './App.css';

const initialData = [
  {
    equipment: 'DC1234A',
    location: 'WB',
    date: '2023-10-15',
  },
  {
    equipment: 'DC5678B',
    location: 'TA',
    date: '2023-11-12',
  },
  {
    equipment: 'TM4321C',
    location: 'WB',
    date: '2023-10-15',
  },
  {
    equipment: 'JH8765D',
    location: 'TB',
    date: '2023-10-08',
  },
];

function App() {
  const [equipment, setEquipment] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newEquipment = { equipment };
    console.log(newEquipment);

    setEquipment('');
  }

  return (
    <>
      <div>
        <h2>Inventory</h2>
        {initialData.map((item) => (
          <div key={item.equipment}>
            <h3>{item.equipment}</h3>
            <p>{item.location}</p>
            <p>{item.date}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Enter equipment</h3>
        <select>
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
