import React from 'react';
import styled from 'styled-components'
// import { Link } from 'react-router-dom';

const Title = ({ children }) => {
  return (
    <TitleBox>{children}</TitleBox>
  );
};

export default Title;

const TitleBox= styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;