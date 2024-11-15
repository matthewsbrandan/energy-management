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
  if(device.device_type?.data?.toggler){
    socket.on(`toggler:${device.id}`, ({ state }) => {
      if(state && viewDevices[device.id]) viewDevices[device.id].toggler = { state };
    })
  }
  if(device.device_type?.data?.monitoring){
    socket.on(`monitoring:${device.id}`, ({ monitoring }) => {
      if(monitoring && viewDevices[device.id]){
        const { total, unit } = monitoring;
        viewDevices[device.id].monitoring = { total, unit };
      }

      loadDeviceMonitoringDetails(device.id);
    })
  }
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
const getMonitoringLastEightHours = async (id) => {
  try{
    const { data } = await api.get(route.device.monitoring.last_eight_hours(id));

    return data;
  }catch(e){
    console.error(e);
    return e;
  }
} 
//#endregion TOGGLER