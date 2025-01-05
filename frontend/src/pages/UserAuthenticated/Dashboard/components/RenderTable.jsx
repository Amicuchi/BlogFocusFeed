import Proptypes from 'prop-types';

/**
 * Função genérica para renderizar tabelas.
 * @param {Array} headers - Cabeçalhos da tabela.
 * @param {Array} data - Dados da tabela.
 * @param {Function} renderRow - Função para renderizar uma linha.
 * @returns JSX.Element
 */

const RenderTable = ({ headers, data, renderRow }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => renderRow(item))
        ) : (
          <tr>
            <td colSpan={headers.length}>Nenhum dado encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

RenderTable.propTypes = {
  headers: Proptypes.array.isRequired,
  data: Proptypes.array.isRequired,
  renderRow: Proptypes.func.isRequired,
};

export default RenderTable;
