import { useEffect, useState } from 'react';
import './App.css';
import initialData from './Data';

function App() {
  const [inventory, setInventory] = useState(initialData);

  const filteredLocations = [
    ...new Set(inventory.map((item) => item.location)),
  ];
  console.log('current filtered locations are ', filteredLocations);

  function handleAddItems(item) {
    console.log('adding:', item);
    setInventory((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(equipment) {
    const confirmed = window.confirm(
      `are you sure you wish to delete ${equipment} from today's inventory? `
    );
    console.log('deleted:', equipment);
    if (confirmed)
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
    <div className="app">
      <h2>Inventory</h2>
      <List
        inventory={inventory}
        filtered={filteredLocations}
        onDeleteItem={handleDeleteItem}
      />
      <Form onAddItems={handleAddItems} />
    </div>
  );
}

function List({ inventory, filtered, onDeleteItem }) {
  return (
    <div className="list">
      {filtered.map((loc) => (
        <ul key={loc}>
          <h3>{loc}</h3>
          <div>
            {inventory
              .filter((item) => item.location == loc)
              .map((equip) => (
                <Item
                  item={equip}
                  key={equip.equipment}
                  onDeleteItem={onDeleteItem}
                />
              ))}
          </div>
        </ul>
      ))}
    </div>
  );
}

function Form({ onAddItems }) {
  const [equipment, setEquipment] = useState('');
  const [location, setLocation] = useState('TA');
  const [isChecked, setIsChecked] = useState(false);
  const [addedEquipment, setAddedEquipment] = useState('');

  function handleSubmit(e) {
    const currentDate = new Date().toLocaleDateString();

    e.preventDefault();

    if (!equipment) return;

    const newEquipment = {
      equipment,
      location,
      date: currentDate,
      addedEquipment,
    };
    console.log(newEquipment);
    console.log(currentDate);

    onAddItems(newEquipment);

    setEquipment('');
    setIsChecked(false);
    setAddedEquipment('');
  }

  function handledChecked(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Equipment to be entered</h3>
      <h4>
        {location} - {equipment} - {addedEquipment}
      </h4>

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
        onChange={(e) => setEquipment(e.target.value.toUpperCase())}
      />

      <label>Additional Equipment? </label>
      <input type="checkbox" checked={isChecked} onChange={handledChecked} />
      {isChecked ? (
        <input
          type="text"
          placeholder="Trailer number"
          value={addedEquipment}
          onChange={(e) => setAddedEquipment(e.target.value.toUpperCase())}
        />
      ) : (
        ''
      )}

      <br />

      <button>Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <p>
        {item.addedEquipment
          ? `${item.equipment} + ${item.addedEquipment}`
          : item.equipment}
      </p>
      {/* <p>{item.location}</p> */}
      {/* <p>{item.date}</p> */}
      <button onClick={() => onDeleteItem(item.equipment)}>Delete</button>
    </li>
  );
}

export default App;
