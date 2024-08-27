import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [isAdd, setIsAdd] = useState(false);

  const toggleAddFriendButton = () => {
    setIsAdd((state) => !state);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ListFriends />
        {isAdd && <FormAddFriend />}
        <Button onClick={toggleAddFriendButton}>
          {isAdd ? 'Close' : 'Add friend'}
        </Button>
      </div>
      <FormSplitBuild />
    </div>
  );
}

function ListFriends() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <h3>{friend.name}</h3>
      <img src={friend.image} alt={friend.name} />

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');

  return (
    <form className="form-add-friend">
      <label>🧍‍♂️🧍‍♀️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌆 Image url</label>
      <input
        type="text"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBuild() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💶 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧍‍♂️🧍‍♀️ X's expense</label>
      <input type="text" disabled />

      <label>💸 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
