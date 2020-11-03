export const splice = (array, value) => {
    const index = array.indexOf(value);
    array.splice(index, 1);
  };

export const reducermethod = (array) => {
    return array.reduce((total, next) => total + next);
  };