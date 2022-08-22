import styled from '@emotion/styled';
import clsx from 'clsx';
import {size} from 'polished';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    img: require('@site/static/img/Saly-38.png').default,
    description: (
      <>
        Better scripts can be used with <strong>zero-config</strong>. Though
        your can progressively add description, env, child scripts... for your
        scripts.
      </>
    )
  },
  {
    title: 'Better DX',
    img: require('@site/static/img/Saly-39.png').default,
    description: (
      <>
        It provides you a better development experience with a simple command to
        start with.
      </>
    )
  },
  {
    title: 'Consistent',
    img: require('@site/static/img/Saly-40.png').default,
    description: (
      <>
        Once you use better-scripts for all your projects, you will get a
        consistent scriping experience.
      </>
    )
  }
];

const ImageWrapper = styled.div`
  padding: 20px;
  background-color: rgb(114 109 197 / 8%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const Image = styled.img`
  ${size(240)}
  object-fit: contain;

  @media screen and (max-width: 996px) {
    ${size(180)}
  }
`;

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <ImageWrapper>
        <Image src={img} alt='' />
      </ImageWrapper>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
