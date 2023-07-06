import { useState } from 'react';
import { Table } from './components/Table';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { FilterNavigation } from './components/FilterNavigation';

const getCategoryById = categoryId => (
  categoriesFromServer.find(category => category.id === categoryId) || null
);

const getUserById = useId => (
  usersFromServer.find(user => user.id === useId) || null
);

const getPreparedProducts = (filterOptions) => {
  const {
    selectedUser,
    selectedProductName,
  } = filterOptions;

  const products = productsFromServer.map((product) => {
    const category = getCategoryById(product.categoryId);
    const user = getUserById(category.ownerId);

    return {
      ...product,
      category,
      user,
    };
  });

  let preparedProducts = [...products];

  if (selectedUser) {
    preparedProducts = preparedProducts.filter(product => (
      product.user.id === selectedUser.id
    ));
  }

  if (selectedProductName) {
    const lowerProductName = selectedProductName.toLowerCase();

    preparedProducts = preparedProducts.filter(product => (
      product.name.toLowerCase().includes(lowerProductName)
    ));
  }

  return preparedProducts;
};

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const preparedProducts = getPreparedProducts({
    selectedUser,
    selectedProductName,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <FilterNavigation
          users={usersFromServer}
          categories={categoriesFromServer}
          selectedUser={selectedUser}
          changeUser={setSelectedUser}
          productName={selectedProductName}
          changeProductName={setSelectedProductName}
          selectedCategories={selectedCategories}
          changeCategories={setSelectedCategories}
        />

        <div className="box table-container">
          {preparedProducts.length > 0 ? (
            <Table products={preparedProducts} />
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
