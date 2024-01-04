export const AuthSwagger = {
  prefix: 'v1/auth',
  tags: 'Auth',
  login: {
    url: 'login',
    summary: 'Login username and password',
    description: 'Login Successful.',
  },
  register: {
    url: 'register',
    summary: 'Register user',
    description: 'Register Successful.',
  },
  refreshToken: {
    url: 'refresh-token',
    summary: 'Refresh token',
    description: 'Refresh token Successful.',
  },
  logout: {
    url: 'logout',
    summary: 'Logout',
    description: 'Logout Successful.',
  },
};
