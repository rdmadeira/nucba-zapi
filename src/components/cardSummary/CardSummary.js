import styled from 'styled-components';
import { CustomButton } from '../UI/CustomButton';
import { formatPriceARS } from '../../utils';

const CardContainer = styled.div`
  max-width: 660px;
  width: 100%;
`;

const CardSummaryStyled = styled.div`
  margin-top: 62px;
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
`;

const CardSummaryContent = styled.div`
  padding: 24px 32px 15px;
  border-radius: 15px 15px;
  background-color: #fff;
`;

const UlCard = styled.ul`
  list-style: none;
  padding: 0;
`;

const LiCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: #9faab7;
  margin-bottom: 15px;
`;

const RowCard = styled.hr`
  height: 1px;
  width: 100%;
  background-color: #e5edef;
  margin: 8px 0;
`;

const TotalCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const CardSummary = ({ formIsValid, envio, subTotal }) => {
  return (
    <CardContainer>
      <CardSummaryStyled>
        <CardSummaryContent>
          <UlCard>
            <LiCard>
              <p>Costo de Productos</p>
              <span>{formatPriceARS(subTotal)}</span>
            </LiCard>
            <LiCard>
              <p>Costo de Envío</p>
              <span>{formatPriceARS(envio)}</span>
            </LiCard>
          </UlCard>
          <RowCard />
          <TotalCard>
            <h4>Total</h4>
            <h4>{formatPriceARS(subTotal + envio)}</h4>
          </TotalCard>
          <CustomButton w="100%" m="0px" disabled={!formIsValid}>
            Pagar
          </CustomButton>
        </CardSummaryContent>
      </CardSummaryStyled>
    </CardContainer>
  );
};
