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

// socket.on('toggler:')