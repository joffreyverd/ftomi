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
      'indent': [
        'error',
        4,
        {
            'SwitchCase': 2
        }
      ],
      'jsx-quotes': [
        'error',
        'prefer-single'
      ],
    },
    'globals': {
      'fetch': false
    }
  }
