import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../components/menu/FoodGrid';

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

const FoodDialogContainer = ({ openFood }) => {
  console.log(typeof openFood.img);
  return (
    <>
      <DialogShadow />
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
  return <FoodDialogContainer openFood={props.openFood}></FoodDialogContainer>;
};

export default FoodDialog;
