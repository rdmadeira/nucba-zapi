import * as userActions from '../../redux/user/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase-utils';
import { Link } from 'react-router-dom';

import {
  UserMenuStyled,
  WelcomeTitle,
  MenuOptions,
  MenuOptionElement,
  Shadow,
} from './UserMenuElements';

export const UserMenu = ({ user }) => {
  const { hiddenMenu } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <UserMenuStyled>
      <WelcomeTitle>Hola</WelcomeTitle>
      <MenuOptions>
        <MenuOptionElement>Mis Ordenes</MenuOptionElement>
        <MenuOptionElement>Cerrar Sesion</MenuOptionElement>
      </MenuOptions>
    </UserMenuStyled>
  );
};
