const getFactionType = (type: any): string => {
  let str = "";
  Number(type);
  switch (type) {
    case 1: {
      str = "Police";
      break;
    }
    case 2: {
      str = "Fire";
      break;
    }
    case 3: {
      str = "Federal Agency";
      break;
    }
    case 4: {
      str = "Street Gang";
      break;
    }
    default: {
      break;
    }
  }
  return str;
};

export default getFactionType;
