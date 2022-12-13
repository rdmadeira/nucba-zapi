import styled from 'styled-components';
import { Title } from '../../styles/title';
import { nucbazapiRed } from '../../styles/utilities';
import RemoveIcon from '../../assets/delete-full.svg';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../redux/cart/cartActions';

const StyledQuantityManage = styled(Title)`
  min-width: 100px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  height: 24px;
  align-items: center;
  border-radius: 8px;
  margin: 5px;
  height: 32px;
  padding: 10px;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
`;

const Quantity = styled.span`
  font-size: 14px;
  width: 24px;
  text-align: center;
`;

const QuantityButtons = styled.div`
  width: 23px;
  color: ${nucbazapiRed};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  line-height: 23px;
  margin: 0px 10px;
  &:hover {
    background-color: #ffe3e3;
  }
`;

const RemoveIconStyled = styled.img`
  width: 17px !important;
  height: 17px !important;
  cursor: pointer;
  margin: 0 10px;
  color: red;
`;

export const QuantityManage = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <StyledQuantityManage>
      {item.quantity === 1 ? (
        <RemoveIconStyled
          src={RemoveIcon}
          onClick={() => dispatch(cartActions.removeItem(item))}
        ></RemoveIconStyled>
      ) : (
        <QuantityButtons onClick={() => dispatch(cartActions.removeItem(item))}>
          -
        </QuantityButtons>
      )}
      <Quantity>{item.quantity}</Quantity>
      <QuantityButtons onClick={() => dispatch(cartActions.addItem(item))}>
        +
      </QuantityButtons>
    </StyledQuantityManage>
  );
};
