import { useState } from 'react';
import { Table } from './components/Table';
import { FilterNavigation } from './components/FilterNavigation';
import { sortIcons } from './sortIcons';
import { sortFields } from './sortFields';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import './App.scss';

const getCategoryById = categoryId => (
  categoriesFromServer.find(category => category.id === categoryId) || null
);

const getUserById = useId => (
  usersFromServer.find(user => user.id === useId) || null
);

const sortDataByTypes = (type, firstValue, secondValue) => {
  if (type === 'number') {
    return firstValue - secondValue;
  }

  if (type === 'string') {
    return firstValue.localeCompare(secondValue);
  }

  return 0;
};

const sortData = (data, order, field) => {
  data.sort((a, b) => {
    if (order === sortIcons.SORT_UP) {
      return sortDataByTypes(typeof a[field], a[field], b[field]);
    }

    if (order === sortIcons.SORT_DOWN) {
      return sortDataByTypes(typeof a[field], b[field], a[field]);
    }

    return 0;
  });
};

const getPreparedProducts = (filterOptions) => {
  const {
    selectedUser,
    selectedProductName,
    selectedCategories,
    sortField,
    sortOrder,
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

  if (selectedCategories.length > 0) {
    preparedProducts = preparedProducts.filter((product) => {
      const { category } = product;

      return selectedCategories.includes(category.title);
    });
  }

  if (sortField) {
    switch (sortField) {
      case sortFields.ID:
        sortData(preparedProducts, sortOrder, sortFields.ID);
        break;

      case sortFields.PRODUCT:
        sortData(preparedProducts, sortOrder, 'name');
        break;

      case sortFields.CATEGORY:
        preparedProducts.sort((a, b) => {
          if (sortOrder === sortIcons.SORT_UP) {
            return sortDataByTypes(
              typeof a.category.title, a.category.title, b.category.title,
            );
          }

          if (sortOrder === sortIcons.SORT_DOWN) {
            return sortDataByTypes(
              typeof a.category.title, b.category.title, a.category.title,
            );
          }

          return 0;
        });
        break;

      case sortFields.USER:
        preparedProducts.sort((a, b) => {
          if (sortOrder === sortIcons.SORT_UP) {
            return sortDataByTypes(
              typeof a.user.name, a.user.name, b.user.name,
            );
          }

          if (sortOrder === sortIcons.SORT_DOWN) {
            return sortDataByTypes(
              typeof a.user.name, b.user.name, a.user.name,
            );
          }

          return 0;
        });
        break;

      default:
        break;
    }
  }

  return preparedProducts;
};

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortField, setSortField] = useState(sortFields.DEFAULT);
  const [sortOrder, setSortOrder] = useState(sortIcons.DEFAULT);

  const preparedProducts = getPreparedProducts({
    selectedUser,
    selectedProductName,
    selectedCategories,
    sortField,
    sortOrder,
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
            <Table
              products={preparedProducts}
              changeSortField={setSortField}
              changeSortOrder={setSortOrder}
            />
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
