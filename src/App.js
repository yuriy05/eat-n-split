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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleAddFriendButton = () => {
    setIsAdd((state) => !state);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend((cur) =>
      cur?.id === friend.id ? null : friend,
    );
    setIsAdd(false);
  };

  const handldeSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ListFriends
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
        {isAdd && (
          <FormAddFriend
            onAddFriends={setFriends}
            onIsAdd={setIsAdd}
          />
        )}
        <Button onClick={toggleAddFriendButton}>
          {isAdd ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handldeSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function ListFriends({ friends, selectedFriend, onSelectFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriends, onIsAdd }) {
  const [name, setName] = useState('');

  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();

    if (!name || !image) return;

    const data = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriends((friends) => [...friends, data]);

    setName('');
    onIsAdd(false);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧍‍♂️🧍‍♀️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌆 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [userPay, setUserPay] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const paidByFriend = bill ? bill - userPay : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !userPay) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -userPay);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend?.name}</h2>

      <label>💶 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♂️ Your expense</label>
      <input
        type="text"
        value={userPay}
        onChange={(e) =>
          setUserPay(
            Number(e.target.value) > bill
              ? userPay
              : Number(e.target.value),
          )
        }
      />

      <label>🧍‍♂️🧍‍♀️ {selectedFriend?.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>💸 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
