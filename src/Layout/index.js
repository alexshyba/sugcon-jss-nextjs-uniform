import React from 'react';
import dynamic from 'next/dynamic';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Footer from '../Footer';
import Nav from '../Nav';

// const Nav = dynamic(() => import('../Nav'), { ssr: false });

export default function Layout({ route, context }) {
  return (
    <>
      <Nav context={context} route={route} />
      <Placeholder name="sugcon-main" rendering={route} route={route} />
      <Footer context={context} route={route} />
    </>
  );
}
