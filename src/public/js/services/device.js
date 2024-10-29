const deviceToggler = async (id, state) => {
  try{
    const { data } = await api.post(route.device.state(id), {
      mode: 'toggler',
      state
    });
    return data;
  }catch(e){
    console.error(e);
    return e;
  }
}