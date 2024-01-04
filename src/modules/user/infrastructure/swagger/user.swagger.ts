export const UserSwagger = {
  prefix: 'v1/users',
  tags: 'User',
  profile: {
    url: 'profile',
    summary: 'Get user profile',
    description: 'Get user profile',
  },
  create: {
    url: '',
    summary: 'Create user',
    description: 'Create user',
  },
  update: {
    url: '/:id',
    summary: 'Update user',
    description: 'Update user',
  },
};
