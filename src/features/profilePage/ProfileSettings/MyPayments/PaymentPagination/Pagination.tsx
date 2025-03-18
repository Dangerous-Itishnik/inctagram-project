// import styles from '@/features/profilePage/ProfileSettings/MyPayments/PaymentPagination/paymentPagination.module.scss'
//
// type Pagination = {
//   currentPage: number
//   handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
//   handlePageChange: (page: number) => void
//   itemsPerPage: number
//   totalPages: number
// }
//
// export const PaginationComponent = ({
//   currentPage,
//   handleItemsPerPageChange,
//   handlePageChange,
//   itemsPerPage,
//   totalPages,
// }: Pagination) => {
//   return (
//     <>
//       <div className={styles.pagination}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           type={'button'}
//         >
//           &lt;
//         </button>
//
//         {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
//           const pageNumber = index + 1
//
//           return (
//             <button
//               className={currentPage === pageNumber ? styles.active : ''}
//               key={pageNumber}
//               onClick={() => handlePageChange(pageNumber)}
//               type={'button'}
//             >
//               {pageNumber}
//             </button>
//           )
//         })}
//
//         {totalPages > 5 && <span>...</span>}
//
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           type={'button'}
//         >
//           &gt;
//         </button>
//
//         <span className={styles.showText}>Show</span>
//         <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={15}>15</option>
//         </select>
//         <span className={styles.onPageText}>on page</span>
//       </div>
//     </>
//   )
// }
