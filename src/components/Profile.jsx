/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { BiLogOutCircle } from 'react-icons/bi';
import { GiCook } from 'react-icons/gi';
import { BsCheck2Circle } from 'react-icons/bs';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/Profile.css';

function Profile() {
  const [profile, setProfile] = useState({ email: 'Sem Email cadastrado' });
  const history = useHistory();

  const { getLocalStorage, clearLocalStorage } = useLocalStorage();
  useEffect(() => {
    const result = getLocalStorage('user');

    if (result) {
      setProfile({
        ...profile,
        email: result.email,
      });
    }
  }, []);

  const logout = () => {
    clearLocalStorage();
    history.push('/');
  };

  return (
    <div className="container-profile">
      <p
        className="profile-email"
        data-testid="profile-email"
      >
        <GiCook className="cook" />
        <i>{profile.email}</i>

      </p>
      <div className="buttons-profile">
        <button
          className="profile-btn-recipes"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
          <BsCheck2Circle className="doneRcipes" />
        </button>
        <button
          className="profile-btn-favorite-recipes"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
          <GrFavorite className="favorite" />

        </button>
        <button
          className="profile-btn-logout"
          data-testid="profile-logout-btn"
          onClick={ () => { logout(); } }
        >
          Logout
          <BiLogOutCircle className="logout" />

        </button>
      </div>
    </div>
  );
}

export default Profile;
