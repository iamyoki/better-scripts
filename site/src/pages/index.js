import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import {Box, Flex} from 'rebass';

import HomepageFeatures from '../components/HomepageFeatures/index';
import {Header, Image, Main, Tagline, Title} from './styles';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {colorMode} = useColorMode();

  return (
    <Header>
      <Box>
        <Title>{siteConfig.title}</Title>
        <Tagline>
          A better way to organize and run your npm scripts. <br />
          Make redundant NPM scripts easier to read, maintain and use.
        </Tagline>
        <Flex style={{gap: 20}} justifyContent='center'>
          <Link
            className='button button--secondary button--lg'
            to='/docs/intro'
            style={{
              background: 'linear-gradient(to right bottom, #5d3fd1, #d98df7)',
              color: 'white',
              border: 'none'
            }}>
            Get Started →
          </Link>

          <Link
            className='button button--secondary button--lg'
            to='https://github.com/iamyoki/better-scripts'>
            View on Github →
          </Link>
        </Flex>
      </Box>
      {/* <Box minWidth={300}>
        <Image src='/example2.png' />
      </Box> */}
    </Header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description='A better way to organize and run your npm scripts'>
      <Main>
        <HomepageHeader />
        <HomepageFeatures />
      </Main>
    </Layout>
  );
}
