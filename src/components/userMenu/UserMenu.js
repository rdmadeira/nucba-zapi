// import * as userActions from '../../redux/user/user-actions';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase-utils';
import { Link } from 'react-router-dom';

import {
  UserMenuStyled,
  WelcomeTitle,
  MenuOptions,
  MenuOptionElement,
  Shadow,
} from './UserMenuElements';

export const UserMenu = ({ user, handleToggle }) => {
  const { hiddenMenu } = useSelector((state) => state.user);
  return (
    <>
      {!hiddenMenu && <Shadow onClick={handleToggle} />}
      {!hiddenMenu ? (
        <UserMenuStyled>
          <WelcomeTitle>Hola {user.displayName}</WelcomeTitle>
          <MenuOptions>
            <MenuOptionElement>Mis Ordenes</MenuOptionElement>
            <MenuOptionElement
              onClick={() =>
                auth.signOut().then(() => {
                  console.log('user logged out');
                })
              }
            >
              Cerrar Sesion
            </MenuOptionElement>
          </MenuOptions>
        </UserMenuStyled>
      ) : null}
    </>
  );
};
