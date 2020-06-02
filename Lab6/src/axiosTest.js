const axios = require("axios").default;

async function getUser() {
  return axios.get("https://randomuser.me/api/").then((resp) => {
    return resp.data;
  });
}

getUser().then((data) => {
  const user = data.results[0];
  const formattedString = 
    `${user.name.title}. ${user.name.first} ${user.name.last}`+
    `, username: ${user.login.username}, age: ${user.dob.age}, email: ${user.email}`;
  console.log(formattedString);
});
