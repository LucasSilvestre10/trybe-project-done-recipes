/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

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
    <div>
      <p data-testid="profile-email">{profile.email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => { logout(); } }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
