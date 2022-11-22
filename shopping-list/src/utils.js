// ok nice algorithm to generate unique id's
export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

const STORAGE_NAME = "EIKA_TODO";

// good code separation to handle the local storage
export const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
};

export const readFromStorage = () => {
  let data = localStorage.getItem(STORAGE_NAME);
  if (data) {
    data = JSON.parse(data);
    return data;
  }
  return [];
};
