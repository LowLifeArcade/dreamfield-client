import { useReducer, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import router from 'next/router';

const initialState = {
  user: null,
};

// create context
const Context = createContext();

// create reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      window.localStorage.removeItem('projectslug');
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/csrf-token`
      );
      console.log('CSRF in context', data);
      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
      // axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  // I believe this runs as a middlware between a response and error. So if I get an error logging in it logs me out.
  axios.interceptors.response.use(
    (response) => {
      // status code in range of 2xx cause this function to trigger
      return response;
    },
    (error) => {
      // status codes out of range 2xx trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`${process.env.NEXT_PUBLIC_API}/logout`)
            .then((data) => {
              console.log('/501 error > logout > data', error);
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              router.push('/login');
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTORS ERR', err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    </>
  );
};

export { Context, Provider };
