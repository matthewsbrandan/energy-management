export const removePrefix = (url: string, prefix: string) => url.replace(prefix, '');
export const route = {
  home: () => '/',
  auth: {
    register: () => '/auth/register',
    login:    () => '/auth/login',
    logout:   () => '/auth/logout'
  },
  device: {

  },
  api: {
    device: {
      prefix: '/api/device',
      get:    () => '/api/device',
      store:  () => '/api/device',
      update: () => '/api/device',
    },
    device_type: {
      get:    () => '/api/device-type',
      store:  () => '/api/device-type',
      update: () => '/api/device-type/:id',
      delete: () => '/api/device-type/:id'
    }
  }
}