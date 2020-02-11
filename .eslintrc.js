module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
      'import/no-named-as-default': 0,
      'indent': [
        'error',
        2,
        {
            'SwitchCase': 2
        }
      ],
      'jsx-quotes': [
        'error',
        'prefer-single'
      ],
      'global-require': 0
    },
    'globals': {
      'fetch': false
    }
  }
