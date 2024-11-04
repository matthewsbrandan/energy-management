//#region TOGGLER
const communication_mode = 'socket'; // socket | api
const deviceToggler = async (id, state) => {
  if(communication_mode === 'socket'){
    return await new Promise((resolve) => {
      socket.emit('update-state', {
        id,
        user_id,
        mode: 'toggler',
        state
      }, (response) => resolve(response))
    })
  }else{
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
}

devices.forEach((device) => {
  if(!device.device_type?.data?.toggler) return;
  socket.on(`toggler:${device.id}`, ({ state }) => {
    if(state) viewDevices[device.id].toggler = { state };
  })
})

const getTogglerLastEightHours = async (id) => {
  try{
    const { data } = await api.get(route.device.toggler.last_eight_hours(id));

    return data;
  }catch(e){
    console.error(e);
    return e;
  }
}
//#endregion TOGGLER