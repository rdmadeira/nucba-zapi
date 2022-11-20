import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/nucbazappiintegral.png';

const NavbarStyled = styled.div`
  padding: 10px;
  position: fixed;
  background-color: #f1e7ca70;
  width: 100%;
  z-index: 999;
  border-bottom: 1px solid #e5edef;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;

// Este es un componente funcional, que tiene children 'componentes estilizados'
export const Navbar = () => {
  return (
    <NavbarStyled>
      <Logo src={logo} />
    </NavbarStyled>
  );
};
