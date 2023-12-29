export class UserConfig {
  static readonly tag = 'User';
  static readonly prefix = 'v1/users';
  static readonly profile = {
    url: 'profile',
    summary: 'Get profile of user',
    description: 'Get profile of user',
  };
  static readonly create = {
    url: '',
    summary: 'Create user',
    description: 'Create user',
  };
  static readonly update = {
    url: ':id',
    summary: 'Update user',
    description: 'Update user',
  };
}
