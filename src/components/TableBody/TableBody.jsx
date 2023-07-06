import React from 'react';
import classNames from 'classnames';

export const TableBody = ({ products }) => (
  <tbody>
    {products.map((product) => {
      const { category, user } = product;

      const personClassNames = classNames({
        'has-text-link': user.sex === 'm',
        'has-text-danger': user.sex === 'f',
      });

      return (
        <tr data-cy="Product" key={product.id}>
          <td className="has-text-weight-bold" data-cy="ProductId">
            {product.id}
          </td>

          <td data-cy="ProductName">{product.name}</td>
          <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

          <td data-cy="ProductUser" className={personClassNames}>
            {user.name}
          </td>
        </tr>
      );
    })}
  </tbody>
);
