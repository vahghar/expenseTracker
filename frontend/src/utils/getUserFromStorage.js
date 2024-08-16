//this is to get the token
export const getUserFromStorage = () => {
    const token = JSON.parse(localStorage.getItem("userInfo") || null);
    return token?.token;
  };