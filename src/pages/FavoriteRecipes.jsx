import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';

function FavoriteRecipes() {
  return (
    <>
      <Header />
      <FavoriteRecipesCard />
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
