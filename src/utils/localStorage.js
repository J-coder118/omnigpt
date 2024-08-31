export const getItemLocal = (key) => {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export const setItemLocal = (key, value) => {
  localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  );
};

export const isAuthenticationPage = () => {
  return (window.location.pathname.split("/")[1] === "auth" || window.location.pathname === "/") &&  window.location.hash === "";
};
