import React from 'react'
import Pagination from 'react-js-pagination'
import 'assets/styles/paging.css'

function Paging({ page, count, setPage, size }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={size}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  )
}
export default Paging
