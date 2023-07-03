import React, { useState /* , useEffect */ } from 'react';
import styled from 'styled-components';
import { formatPriceARS } from '../../utils';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';
import { Tagsmenu, Tagcard, Tagimg } from './TagMenu';

import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';

const MenuStyled = styled.div`
  height: 1000px;
  /* width: 50%; */
  margin: 0px 20px 50px 20px;
  z-index: 3;
`;

const FoodTitle = styled.h3`
  margin: 15px 0 0 0;
  background-color: #59ff87ad;
  text-align: right;
`;

const Menu = ({ setOpenFood }) => {
  let categoriesData = useCategories();
  let productsData = useProducts();

  let categories = categoriesData?.data?.data?.result;
  let products = productsData?.data?.result;
  console.log(categories, products);

  const [sectionId, setSectionId] = useState(null);

  /* let categories = useSelector((store) => store.categories.categories); */

  /*   if (section) {
    foods = { [section]: foods[section] };
  } */

  /* useEffect(() => {
    const getProducts = async () => {
      let products = await productsData?.data?.result;
    };
    getProducts();
  }, [productsData]); */

  return (
    <MenuStyled>
      <h2>Menu</h2>
      <Tagsmenu>
        {sectionId && (
          <Tagcard onClick={() => setSectionId(null)}>
            <p>Todos</p>
          </Tagcard>
        )}
        {categories &&
          categories.map((category) => (
            <Tagcard
              onClick={() => setSectionId(category.id)}
              selected={category.category === sectionId ? true : false}
            >
              <Tagimg img={category.imgTag} />
              <p>{category.category}</p>
            </Tagcard>
          ))}
      </Tagsmenu>

      {/* Con esta opcion: Object.keys.map(key), tenemos que hacer doble map, porque Object.keys devuelve un array de las keys en string. Habria que iterar de nuevo usando maps para cada key. En cambio, 
      Object.entries devuelve un array, cuyos elementos son array conteniendo la key y el array de foods.
      Object.keys: [key1, key2, key3,...]
      Object.entries: [[key1, foods], [key2, food2], [key3, food3],...]
      {Object.keys(Foods).map((key) => {
        return (
          <>
            <FoodTitle>{key}</FoodTitle>
            <FoodGrid>
              {Foods[key].map((food) => (
                <Food img={food.img}>{food.name}</Food>
              ))}
            </FoodGrid>
          </>
        );
      })} */}
      {sectionId ? (
        <>
          <FoodTitle>
            {categories.find((cat) => cat.id === sectionId).category}
          </FoodTitle>
          <FoodGrid>
            {products
              ?.filter((product) => product.categoryId === sectionId)
              .map((product) => {
                return (
                  <Food
                    img={product.imgUrl}
                    onClick={() => setOpenFood(product.name)}
                  >
                    <FoodLabel>
                      <div>{product.name}</div>
                      <div>{formatPriceARS(product.price)}</div>
                    </FoodLabel>
                  </Food>
                );
              })}
          </FoodGrid>
        </>
      ) : (
        categories?.map((category) => {
          return (
            <>
              <FoodTitle>{category.category}</FoodTitle>
              <FoodGrid>
                {products
                  ?.filter((prod) => prod.categoryId === category.id)
                  .map((product) => (
                    <Food
                      img={product.imgUrl}
                      onClick={() => setOpenFood(product.name)}
                    >
                      <FoodLabel>
                        <div>{product.name}</div>
                        <div>{formatPriceARS(product.price)}</div>
                      </FoodLabel>
                    </Food>
                  ))}
              </FoodGrid>
            </>
          );
        })
      )}
    </MenuStyled>
  );
};

export default Menu;
