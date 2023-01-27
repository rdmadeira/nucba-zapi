import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import logo from '../../assets/nucbazappiintegral.png';
import Carticon from '../cart/Carticon';
import { fixed } from '../../styles/utilities';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/user.svg';
import { auth } from '../../firebase/firebase-utils';
import { UserMenu } from '../userMenu/UserMenu';

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
  align-items: center;

  padding: 15px;
  align-self: flex-end;
  margin-right: 15px;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
  cursor: pointer;
`;

const UserLogo = styled.img`
  width: 35px;
  height: auto;
  //cursor: pointer;
`;
const Divider = styled.div`
  display: inline-block;
  border-left: 1px solid #dfdddd;
  margin: 0 25px;
  height: 25px;
`;

const LoginButton = styled.button`
  cursor: pointer;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 15px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  font-family: 'Poppins-SemiBold', Helvetica, Arial, sans-serif;
  background-image: linear-gradient(130deg, #ff9259 0%, #ff2426 70%);
`;

// Este es un componente funcional, que tiene children 'componentes estilizados'
export const Navbar = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  return (
    <NavbarStyled>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <NavigatorMenu>
        <Carticon />
        <Divider />
        {currentUser ? (
          <>
            <UserLogo
              src={userIcon}
              onClick={() =>
                auth.signOut().then(() => {
                  console.log('user logged out');
                })
              }
            />
            <UserMenu user={currentUser} />
          </>
        ) : (
          <Link to="/login">
            <LoginButton>Ingresar</LoginButton>
          </Link>
        )}
      </NavigatorMenu>
    </NavbarStyled>
  );
};
