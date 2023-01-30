import React from 'react'
import Pagination from 'react-js-pagination'
import 'assets/styles/paging.css'

function Paging({ page, count, setPage }) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={count}
      pageRangeDisplayed={4}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  )
}
export default Paging
