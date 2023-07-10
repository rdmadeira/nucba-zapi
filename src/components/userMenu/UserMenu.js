import { useSelector /* , useDispatch */ } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import {
  UserMenuStyled,
  WelcomeTitle,
  MenuOptions,
  MenuOptionElement,
  Shadow,
} from './UserMenuElements';

export const UserMenu = ({ user, handleToggle }) => {
  const { hiddenMenu } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('authData');
    navigate(0);
  };

  return (
    <>
      {!hiddenMenu && <Shadow onClick={handleToggle} />}
      {!hiddenMenu ? (
        <UserMenuStyled>
          <WelcomeTitle>Hola {user.name}</WelcomeTitle>
          <MenuOptions>
            <Link to="mis-ordenes" onClick={handleToggle}>
              <MenuOptionElement>Mis Ordenes</MenuOptionElement>
            </Link>
            <MenuOptionElement onClick={signOut}>
              Cerrar Sesion
            </MenuOptionElement>
          </MenuOptions>
        </UserMenuStyled>
      ) : null}
    </>
  );
};
