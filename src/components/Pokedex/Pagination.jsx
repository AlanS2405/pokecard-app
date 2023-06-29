import './Styles/Pagination.css'

const Pagination = ({ cardsPerPage, paginate, totalCards, currentPage, setCurrentPage}) => {

  const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i)
    }

    const previousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - cardsPerPage)
      }
    }

    const nextPage = () => {
      if (currentPage != ((cardsPerPage * pageNumbers.length) - cardsPerPage)) {
      setCurrentPage(currentPage + cardsPerPage)
      }
    }

    const firtsPage = () => {
      setCurrentPage(0)
    }

    const lastPage = () => {
      setCurrentPage((cardsPerPage * pageNumbers.length) - cardsPerPage)
    }

  return (
    <div>
      <h2 className='pages_title'>Pages</h2>
      <nav className='page_navigator'>
        <a onClick={firtsPage}><i className='bx bx-arrow-to-left'></i></a>
        <a onClick={previousPage}><i className='bx bx-left-arrow bx-fade-left-hover'></i></a>
        <ul className='pagination'>
            {pageNumbers.map(number => (
              <li key={number} className='page_item'>
                <a className='page_numbers' onClick={() => paginate(number)} >
                  {number}
                </a>
              </li>
            ))}
        </ul>
        <a className='nextPage_btn' onClick={nextPage}><i className='bx bx-right-arrow bx-fade-right-hover'></i></a>
        <a onClick={lastPage}><i className='bx bx-arrow-to-right'></i></a>
      </nav>
    </div>
    
  )
}

export default Pagination
