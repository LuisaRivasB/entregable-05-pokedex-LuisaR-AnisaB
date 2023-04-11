import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../index.css';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z ]{3,}$/.test(newNameValue))
      setNameError(
        'Only letters and blanks are allowed and should be at least 5 of length',
      );
    else setNameError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);

      navigate('/pokedex');
    }
  };
  return (
    <div className="padre">
      <div className="img2 max-w-full">
        <img className="max-w-full" src="/pokedex.img" alt="Pokedex" />
      </div>
      <div className="text-center">
        <h1 className="text-yellow-500 text-center text-2xl font-bold">Hello Trainer!!</h1>
        <p className='instructions'>Type your name to start</p>
      </div>
      <div className="form">
        <form
          className="flex flex-row justify-center items-center mt-4 gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="shadow-lg border border-black p-3 input1 rounded-lg"
            value={nameValue}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn-start bg-gradient-to-r from-red-700 to-red-500 p-2 rounded-lg shadow-md hover:text-white hover:scale-90 hover:bg-red-700 font-medium text-gray"
          >
            Start
          </button>
        </form>
        {nameError && <p className="text-red-500 text-center">{nameError}</p>}
        {user && <Navigate to="/pokedex" replace />}
      </div>

      <div className="img1 max-w-full">
        <img src={'./matt-poke.png'} alt="" className="imge" />
      </div>
    </div>
  );
};

export default Home;
