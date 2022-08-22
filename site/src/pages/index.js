import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';
import {Box, Flex} from 'rebass';
import {css} from '@emotion/react';

import HomepageFeatures from '../components/HomepageFeatures/index';
import {
  Caption,
  Header,
  Image,
  Main,
  Tagline,
  Title
} from '../components/components';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {colorMode} = useColorMode();

  return (
    <Header>
      <Box>
        <Title>{siteConfig.title}</Title>
        <Caption>The next level of npm scripts</Caption>
        <Tagline>
          An npm scripts runner. <br />
          A better way to organize your npm scripts. <br />
          Make redundant NPM scripts easier to read, maintain and use.
        </Tagline>
        <Flex
          style={{gap: 20}}
          justifyContent='center'
          flexWrap='wrap'
          css={css`
            @media screen and (max-width: 996px) {
              .button {
                font-size: 14px;
                padding: 8px 12px;
              }
            }
          `}>
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
