function useLocalStorage() {
  const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

  const setLocalStorage = (key, value) => {
    switch (key) {
    case 'user':

      localStorage.setItem(key, JSON.stringify(value));
      break;

    default:
      throw new Error();
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return {
    setLocalStorage,
    getLocalStorage,
    clearLocalStorage,
  };
}

export default useLocalStorage;
