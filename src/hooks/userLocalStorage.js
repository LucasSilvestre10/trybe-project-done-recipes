function userLocalStorage() {
  const getLocalStorage = () => {
    console.log('vou ser deixado de lado');
  };

  const setLocalStorage = (key, value) => {
    switch (key) {
    case 'user':

      localStorage.setItem(key, JSON.stringify(value));
      break;

    default:
      throw new Error();
    }
  };

  return {
    setLocalStorage,
    getLocalStorage,
  };
}

export default userLocalStorage;
