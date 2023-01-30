// import * as userActions from '../../redux/user/user-actions';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase-utils';
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
  return (
    <>
      {!hiddenMenu && <Shadow onClick={handleToggle} />}
      {!hiddenMenu ? (
        <UserMenuStyled>
          <WelcomeTitle>Hola {user.displayName}</WelcomeTitle>
          <MenuOptions>
            <Link to="mis-ordenes" onClick={handleToggle}>
              <MenuOptionElement>Mis Ordenes</MenuOptionElement>
            </Link>
            <MenuOptionElement
              onClick={() =>
                auth.signOut().then(() => {
                  navigate('/');
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
