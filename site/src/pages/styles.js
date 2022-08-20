import styled from '@emotion/styled';
import {rgba} from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 80px;
  font-weight: 800;
  color: transparent;
  background: linear-gradient(to right bottom, #5d3fd1, #d98df7);
  -webkit-background-clip: text;
  background-clip: text;
  white-space: nowrap;
`;

export const Tagline = styled.p`
  font-weight: bold;
  font-size: 20px;
  white-space: pre-wrap;
  opacity: 0.8;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  padding: 20px 80px;
  margin: 0 auto;
  margin-top: 40px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 20px 20px ${rgba('#5d3fd1', 0.2)};
`;
