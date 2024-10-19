### demo-redux

`demo-redux` is a simple utility for creating Redux slices that make API calls using Axios. With this package, you only need to define your API endpoint, HTTP method, and optional parameters, and the package handles the API request lifecycle (loading, success, and failure states) for you.

## Installation

Install the package using npm:

```bash
npm install demo-redux
```

## Usage

To use this package in your project, you will need to create two files: one for setting up the Redux slice and one for dispatching API calls.

### Step 1: Create the API Slice

In this file, you will define the API slice and specify the endpoint, method, and optional parameters.

```typescript
// src/slices/userApiSlice.ts
import { createApiSlice } from 'demo-redux';

const userApi = createApiSlice('userApi', {
  endpoint: 'https://api.example.com/users', // Replace with your API endpoint
  method: 'GET', // Specify the method: 'GET', 'POST', 'PUT', or 'DELETE'
});

export const { apiSlice: userApiSlice, fetchApiData: fetchUserData } = userApi;
```

### Step 2: Set Up Redux Store

Make sure to include the slice in your Redux store.

```typescript
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from './slices/userApiSlice';

const store = configureStore({
  reducer: {
    userApi: userApiSlice.reducer,
  },
});

export default store;
```

### Step 3: Dispatch API Call

Now, you can dispatch the API call in your component by using the `fetchApiData` function.

```typescript
// src/components/UserComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../slices/userApiSlice';
import { RootState } from '../store';

const UserComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.userApi);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserComponent;
```

## API

### `createApiSlice(name: string, options: ApiSliceOptions)`

Creates a Redux slice and an async thunk action to handle API calls.

#### Parameters:
- `name` (string): The name of the slice.
- `options` (object):
  - `endpoint` (string): The URL of the API endpoint.
  - `method` (string): The HTTP method ('GET', 'POST', 'PUT', or 'DELETE').
  - `params` (optional, object): Parameters for the API request.

#### Returns:
- `apiSlice`: The created Redux slice.
- `fetchApiData`: The thunk action to dispatch the API call.

## Example

Here is a full example showing how to use the `createApiSlice` function to make a `GET` request to an API endpoint.

```typescript
import { createApiSlice } from 'demo-redux';

const userApi = createApiSlice('userApi', {
  endpoint: 'https://jsonplaceholder.typicode.com/users',
  method: 'GET',
});

export const { apiSlice: userApiSlice, fetchApiData: fetchUserData } = userApi;
```

## License

This project is licensed under the ISC License.

---

This README provides a clear explanation of how to install and use your package, with code examples for each step. Let me know if you need any changes!
