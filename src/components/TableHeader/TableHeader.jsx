import { useState } from 'react';
import { sortIcons } from '../../sortIcons';
import { sortFields } from '../../sortFields';

export const TableHeader = (props) => {
  const { changeSortOrder, changeSortField } = props;

  const [sortId, setSortId] = useState(sortIcons.DEFAULT);
  const [sortProduct, setSortProduct] = useState(sortIcons.DEFAULT);
  const [sortCategory, setSortCategory] = useState(sortIcons.DEFAULT);
  const [sortUser, setSortUser] = useState(sortIcons.DEFAULT);

  const toggleSortOrder = (newSortOrder, changeCurrentOrder) => {
    switch (newSortOrder) {
      case sortIcons.DEFAULT:
        changeCurrentOrder(sortIcons.SORT_UP);
        changeSortOrder(sortIcons.SORT_UP);
        break;

      case sortIcons.SORT_UP:
        changeCurrentOrder(sortIcons.SORT_DOWN);
        changeSortOrder(sortIcons.SORT_DOWN);
        break;

      case sortIcons.SORT_DOWN:
        changeCurrentOrder(sortIcons.DEFAULT);
        changeSortOrder(sortIcons.DEFAULT);
        break;

      default:
        changeCurrentOrder(sortIcons.DEFAULT);
        changeSortOrder(sortIcons.DEFAULT);
        break;
    }
  };

  const handleChangeSortOrder = (newSortField) => {
    switch (newSortField) {
      case sortFields.ID:
        toggleSortOrder(sortId, setSortId);
        break;

      case sortFields.PRODUCT:
        toggleSortOrder(sortProduct, setSortProduct);
        break;

      case sortFields.CATEGORY:
        toggleSortOrder(sortCategory, setSortCategory);
        break;

      case sortFields.USER:
        toggleSortOrder(sortUser, setSortUser);
        break;

      default:
        break;
    }

    changeSortField(newSortField);
  };

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            ID
            <a href="#/" onClick={() => handleChangeSortOrder(sortFields.ID)}>
              <span className="icon">
                <i data-cy="SortIcon" className={sortId} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Product
            <a
              href="#/"
              onClick={() => handleChangeSortOrder(sortFields.PRODUCT)}
            >
              <span className="icon">
                <i data-cy="SortIcon" className={sortProduct} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Category
            <a
              href="#/"
              onClick={() => handleChangeSortOrder(sortFields.CATEGORY)}
            >
              <span className="icon">
                <i data-cy="SortIcon" className={sortCategory} />
              </span>
            </a>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            User
            <a href="#/" onClick={() => handleChangeSortOrder(sortFields.USER)}>
              <span className="icon">
                <i data-cy="SortIcon" className={sortUser} />
              </span>
            </a>
          </span>
        </th>
      </tr>
    </thead>
  );
};
