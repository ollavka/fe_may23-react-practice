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
  } = props;

  const handleResetAllFilters = () => {
    changeUser(null);
    changeProductName('');
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
            className="button is-success mr-6 is-outlined"
          >
            All
          </a>
          {categories.map(category => (
            <a
              key={category.id}
              data-cy="Category"
              className="button mr-2 my-1 is-info"
              href="#/"
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
