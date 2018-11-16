# APIDoc

```javascript
{
  url: '/login',
  method: 'post',
  params: {
    username,
    password
  },
  return: {
    '-2 | -1': 'Mismatched username and password',
    '1': 'success',
    '2': '账号已被登陆'
  }
},
{
  url: '/register/checkUsername',
  method: 'get',
  params: {
    username
  },
  return: {
    '1': success
  }
},
{
  url: '/register',
  method: 'post',
  params: {
    username, password
  },
  return: {
    '1': success
  }
}
```
