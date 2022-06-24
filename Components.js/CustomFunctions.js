export const JSONToString = (data) => {
    return JSON.stringify(data);
}

export const StringToJSON = (data) => {
    return JSON.parse(data);
}

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};