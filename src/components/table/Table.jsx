import React from "react";
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom';
import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data }) {
  const history = useHistory();
  const navigationTeam = team => history.push(`/teams/${team.TeamId}`, team);

  const { id: isTeamPage } = useParams();

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
  } = useTable(
      {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 5 },
      },
      usePagination
  )

  // Render the UI for your table
  return (
      <TableWrapper>
          <table className="table" {...getTableProps()}>
              <thead>
                  {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                          ))}
                      </tr>
                  ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                      prepareRow(row)
                      return (
                          <TableRow
                            isTeamPage={isTeamPage}
                            onClick={isTeamPage ? undefined : () => navigationTeam(row.original)}
                            {...row.getRowProps()} 
                          >
                              {row.cells.map(cell => {
                                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              })}
                          </TableRow>
                      )
                  })}
              </tbody>
          </table>
          {/* 
      Pagination can be built however you'd like. 
      This is just a very basic UI implementation:
    */}
          <ul className="pagination">
              <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <a className="page-link">First</a>
              </li>
              <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <a className="page-link">{'<'}</a>
              </li>
              <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                  <a className="page-link">{'>'}</a>
              </li>
              <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <a className="page-link">Last</a>
              </li>
              <li>
                  <a className="page-link">
                      Page{' '}
                      <strong>
                          {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                  </a>
              </li>
              <li>
                  <a className="page-link">
                      <input
                          className="form-control"
                          type="number"
                          defaultValue={pageIndex + 1}
                          onChange={e => {
                              const page = e.target.value ? Number(e.target.value) - 1 : 0
                              gotoPage(page)
                          }}
                          style={{ width: '100px', height: '20px' }}
                      />
                  </a>
              </li>{' '}
              <select
                  className="form-control"
                  value={pageSize}
                  onChange={e => {
                      setPageSize(Number(e.target.value))
                  }}
                  style={{ width: '120px', height: '38px' }}
              >
                  {[5, 10, 20, 30, 40, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                      </option>
                  ))}
              </select>
          </ul>
      </TableWrapper >
  )
}

const TableBox = ({columns, data}) => {
    return (
        <Table columns={columns} data={data} />
    )
}

export default TableBox;

const TableWrapper = styled.div`
    width: 70%;
    margin: auto

`

const TableRow = styled.tr`
cursor: ${props => props.isTeamPage ? 'inheret' : 'pointer'};
`