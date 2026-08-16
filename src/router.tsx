import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'resume', element: <Resume /> },
        { path: 'work/:slug', element: <CaseStudy /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    /*
      FIXED 2026-08-16: `v7_startTransition` was here, and it doesn't belong
      here. `createBrowserRouter`'s `future` option is the *router* (data)
      layer's FutureConfig — @remix-run/router's — which has six fields and
      no `v7_startTransition` at all. That flag is a *rendering*-layer future
      flag that only exists on `RouterProvider`'s own `future` prop (see
      main.tsx). It compiled and ran fine, because bundlers don't type-check
      and the router silently ignores unknown future keys — the flag was
      simply never taking effect. Only caught once `tsc -b` actually ran
      (see package.json's `build` script for why it hadn't been).
    */
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export default router;
