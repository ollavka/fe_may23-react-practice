import classNames from 'classnames';
import React from 'react';

export const FilterNavigation = (props) => {
  const {
    users,
    categories,
    selectedUser,
    changeUser,
    productName,
    changeProductName,
    selectedCategories,
    changeCategories,
  } = props;

  const handleResetAllFilters = () => {
    changeUser(null);
    changeProductName('');
    changeCategories([]);
  };

  const handleToggleCategory = (categoryTitle) => {
    changeCategories((prevCategories) => {
      if (prevCategories.includes(categoryTitle)) {
        return prevCategories.filter(category => category !== categoryTitle);
      }

      return [
        ...prevCategories,
        categoryTitle,
      ];
    });
  };

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs has-text-weight-bold">
          <a
            data-cy="FilterAllUsers"
            href="#/"
            className={classNames({
              'is-active': !selectedUser,
            })}
            onClick={() => changeUser(null)}
          >
            All
          </a>

          {users.map(user => (
            <a
              key={user.id}
              data-cy="FilterAllUsers"
              href="#/"
              className={classNames({
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => changeUser(user)}
            >
              {user.name}
            </a>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left has-icons-right">
            <input
              data-cy="SearchField"
              type="text"
              className="input"
              placeholder="Search"
              value={productName}
              onChange={event => changeProductName(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>

            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => changeProductName('')}
              />
            </span>
          </p>
        </div>

        <div className="panel-block is-flex-wrap-wrap">
          <a
            href="#/"
            data-cy="AllCategories"
            className={classNames('button', 'is-success', 'mr-6', {
              'is-outlined': selectedCategories.length > 0,
            })}
            onClick={() => changeCategories([])}
          >
            All
          </a>

          {categories.map(category => (
            <a
              key={category.id}
              data-cy="Category"
              className={classNames('button', 'mr-2', 'my-1', {
                'is-info': selectedCategories.includes(category.title),
              })}
              href="#/"
              onClick={() => handleToggleCategory(category.title)}
            >
              {category.title}
            </a>
          ))}
        </div>

        <div className="panel-block">
          <a
            data-cy="ResetAllButton"
            href="#/"
            className="button is-link is-outlined is-fullwidth"
            onClick={handleResetAllFilters}
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
