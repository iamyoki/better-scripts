import styled from '@emotion/styled';
import {rgba} from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  margin-bottom: 60px;
  margin-top: 40px;
  text-align: center;

  @media screen and (max-width: 996px) {
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 60px;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(to right bottom, #5d3fd1, #d98df7);
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: -0.03em;

  @media screen and (max-width: 996px) {
    font-size: 40px;
  }
`;

export const Caption = styled.p`
  /* font-weight: bold; */
  font-size: 16px;
  opacity: 0.5;
  margin-bottom: 10px;

  @media screen and (max-width: 996px) {
    font-size: 12px;
  }
`;

export const Tagline = styled.p`
  font-weight: bold;
  font-size: 18px;
  white-space: pre-wrap;
  opacity: 0.8;

  @media screen and (max-width: 996px) {
    font-size: 16px;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  padding: 20px 80px;
  margin: 0 auto;
  margin-top: 40px;

  @media screen and (max-width: 996px) {
    padding: 10px 20px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 20px 20px ${rgba('#5d3fd1', 0.2)};

  @media screen and (max-width: 996px) {
    max-height: 200px;
  }
`;
