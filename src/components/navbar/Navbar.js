import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/nucbazappiintegral.png';
import Carticon from '../cart/Carticon';
import { fixed } from '../../styles/utilities';

const NavbarStyled = styled.div`
  padding: 10px;
  ${fixed()} // En position.js se definió valores default para propX, propY, x, y - y también al objeto esperado como parametro de la función, como objeto vacío.
  // Así no hace falta especificar los valores ni el objeto en la funciónb fixed.
  background-color: #f1e7ca70;
  width: 100%;
  z-index: 999;
  border-bottom: 1px solid #e5edef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigatorMenu = styled.nav`
  display: flex;
  padding: 15px;
  align-self: flex-end;
  margin-right: 15px;
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
      <NavigatorMenu>
        <Carticon />
      </NavigatorMenu>
    </NavbarStyled>
  );
};
