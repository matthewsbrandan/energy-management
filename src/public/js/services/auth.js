/** required: /js/services/api.js e configuração das rotas auth */

const login = async ({ email, password }) => {
  try{
    const { data } = await api.post(route.auth.login(), { password, username: email });
    return data;
  }catch(e){
    console.log(e);
    return e;
  }
}

const registerUser = async ({ name, email, password, confirm_parssword }) => {
  try{
    const { data } = await api.post(route.auth.register(), { name, email, password, confirm_parssword });
    return data;
  }catch(e){
    console.log(e);
    return e;
  }
}