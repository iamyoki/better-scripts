import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {useColorMode} from '@docusaurus/theme-common';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {isDarkTheme} = useColorMode();

  return (
    <header className={styles.heroBanner}>
      <div className='container'>
        <h1 className='hero__title'>{siteConfig.title}</h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            to='/docs/intro'>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title={`${siteConfig.tagline}`}
      description='A better way to organize your npm scripts'>
      <HomepageHeader />
      <main
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <img src='/example2.png' alt='' width={500} />
      </main>
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
