export const removePrefix = (url: string, prefix: string) => url.replace(prefix, '');
export const route = {
  home: () => '/',                           // PAGE
  auth: {
    register: () => '/auth/register',        // [POST]
    login:    () => '/auth/login',           // [POST]
    logout:   () => '/auth/logout',          // [POST]
  },
  user: {
    profile:  () => '/perfil'                // PAGE
  },
  device: {
    sync: () => '/dispositivos/sincronizar', // PAGE
  },
  api: {
    device: {
      get:    () => '/api/device',                 // [GET]
      store:  () => '/api/device',                 // [POST]
      update: (id: string) => `/api/device/${id}`, // [PUT]
      delete: (id: string) => `/api/device/${id}`, // [DELETE]
    },
    device_type: {
      get:    () => '/api/device-type',                  // [GET]
      find_one: (id: string) => `/api/device-type/${id}`,// [GET]
      store:  () => '/api/device-type',                  // [POST]
      update: (id: string) => `/api/device-type/${id}`,  // [PUT]
      delete: (id: string) => `/api/device-type/${id}`,  // [DELETE]
    }
  }
}