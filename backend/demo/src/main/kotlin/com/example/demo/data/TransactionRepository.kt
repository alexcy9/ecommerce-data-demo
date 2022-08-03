package com.example.demo.data

import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Page

interface TransactionRepository: PagingAndSortingRepository<Transaction, Long> {

  fun findByInvoiceNoContainingIgnoreCase(searchTerm: String, pageable: Pageable): Page<Transaction>
  fun findByStockCodeContainingIgnoreCase(searchTerm: String, pageable: Pageable): Page<Transaction>
  fun findByDescriptionContainingIgnoreCase(searchTerm: String, pageable: Pageable): Page<Transaction>
  fun findByQuantity(searchTerm: Int, pageable: Pageable): Page<Transaction>
  fun findByInvoiceDateContaining(searchTerm: String, pageable: Pageable): Page<Transaction>
  fun findByUnitPrice(searchTerm: Double, pageable: Pageable): Page<Transaction>
  fun findByCustomerIdContainingIgnoreCase(searchTerm: String, pageable: Pageable): Page<Transaction>
  fun findByCountryContainingIgnoreCase(searchTerm: String, pageable: Pageable): Page<Transaction>

}