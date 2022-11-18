import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../components/menu/FoodGrid';
import { Title } from '../styles/title';
import { nucbazapiRed } from '../styles/colors';

// Los componentes estilizados son buenos para reaprovechar en varios componentes en la app.
const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 150px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.7;
  z-index: 4;
`;

const DialogBanner = styled.div`
  min-height: 150px;
  margin-bottom: 20px;
  ${(img) => `background-image: url(${img.img})`};
  background-position: center;
  background-size: cover;
  boeder-radius: 8px 8px 0 0;
`;

const DialogBannerName = styled(FoodLabel)`
  top: 25px;
  padding: 5px 10px;
`;

const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
`;

const DialogFooter = styled.div`
  box-shadow: 0 -2px 10px 0px gray;
  display: flex;
  justify-content: center;
`;

const Confirmbutton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 8px;
  width: 200px;
  cursor: pointer;
  background-color: ${nucbazapiRed};
  text-align: center;
`;

const FoodDialogContainer = ({ openFood, setOpenFood }) => {
  const handlerClose = () => {
    setOpenFood(null);
  };
  return (
    <>
      <DialogShadow onClick={handlerClose} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
      </Dialog>
    </>
  );
};

const FoodDialog = (props) => {
  if (!props.openFood) return null;
  return (
    <FoodDialogContainer
      /* openFood={props.openFood}
      setOpenFood={props.setOpenFood} */
      {...props}
    >
      Algoooo
    </FoodDialogContainer>
  );
};

export default FoodDialog;
