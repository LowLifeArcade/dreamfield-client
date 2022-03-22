import Layout from '../components/Layout';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '../context';
import axios from 'axios';
import { useEffect } from 'react';

import { ProjectProvider } from '../contexts/SceneMachineProviders';
import { ViewerProvider } from '../contexts/SceneMachineProviders';
import { ProjectContext } from '../contexts/SceneMachineProviders';
import { useContext } from 'react';

// TODO: create a context and reducer for the sideMenuItems prop

function MyApp({ Component, pageProps }) {
  // I think i put this here so the provider can make requests. Not a good solution.
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/csrf-token`);
  //     console.log('CSRF in _app', data.csrfToken);
  //     axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
  //     // axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
  //   };
  //   getCsrfToken();
  // }, []);
  console.log('run _app');
  const project = useContext(ProjectContext);
  console.log('PROJECT IN APP', project);
  // const fakeMenuItems = [
  //   { slug: '/', icon: <i className="fas fa-home"></i>, name: 'Home' },
  //   { slug: '/edit/creator', icon: <i className="far fa-edit"></i>, name: 'Scene Machine' },
  //   { slug: '/creator', icon: <i className="fas fa-cog"></i>, name: 'Settings' },
  //   ,
  // ];
  // const fakeMenuItems2 = [
  //   { slug: '/projects', icon: <i className="fas fa-photo-video"></i>, name: 'Library' },
  //   { slug: `/creator/field/view/${project?.slug}`, icon: <i className="fas fa-phone-square-alt"></i>, name: 'Connect' },
  //   { slug: '/creator', icon: <i className="fas fa-poll"></i>, name: 'Stats' },
  //   { slug: '/creator/field/create', icon: <i className="far fa-plus-square"></i>, name: 'Create New' }
  // ];

  return (
    <Provider>
      <ProjectProvider>
        {/* <ViewerProvider> */}
        <head lang="en" className="notranslate" translate="no">
          {/* <script src="https://kit.fontawesome.com/69aa58689a.js" crossorigin="anonymous"></script> */}
          <meta
            nameName="google"
            content="notranslate"
            lang="en"
            class="notranslate"
            translate="no"
            className="notranslate"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=Marck+Script&display=swap');
          </style>
        </head>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Layout showSideBar={true}>
          <Component {...pageProps} />
        </Layout>
        {/* </ViewerProvider> */}
      </ProjectProvider>
    </Provider>
  );
}

export default MyApp;
