### Directory:

    .
    ├── src
    |   ├── actions                 # actions for redux
    |   │   ├── alert.js                #
    |   │   ├── auth.js                 #
    |   │   ├── profile.js              #
    |   │   └── types.js                #
    |   ├── components
    |   |   └── auth
    |   |   |   ├── Alert.js
    |   |   |   ├── Login.js
    |   |   |   └── Register.js
    |   |   ├── dashboard
    |   |   |   └── Dashboard.js
    |   |   └── layout
    |   |       ├── Landing.js
    |   |       ├── Navbar.js
    |   |       ├── spinner.gif
    |   |       └── Spinner.js
    |   ├── reducers
    |   │        ├── alert.js
    |   │        ├── auth.js
    |   │        ├── index.js
    |   │        └── profile.js
    |   ├── utils
    |   |   └── setAuthToken.js
    |   └── App.css                     # styleSheet
    └── App.js

### React App Structure:

    .
    └── App.js
        └── Provider
            └── Router
                └── Fragment
                    ├── Navbar
                    └── Route path="/" component={Landing}
                        └── container
                            ├── Alert
                            └── Switch
                                ├──  Route path="/register" component={Register}
                                ├── Route path="/login" component={Login}
                                └── Route path="/dashboard" component={Dashboard}
