import { TableBody } from '../TableBody';
import { TableHeader } from '../TableHeader/TableHeader';

export const Table = (props) => {
  const {
    products,
    changeSortField,
    changeSortOrder,
  } = props;

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <TableHeader
        changeSortOrder={changeSortOrder}
        changeSortField={changeSortField}
      />

      <TableBody products={products} />
    </table>
  );
};
