package com.example.demo.data

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.GeneratedValue

@Entity
class Transaction(
  var invoiceNo: String,
  var stockCode: String,
  var description: String,
  var quantity: Int,
  var invoiceDate: String,
  var unitPrice: Double,
  var customerId: String,
  var country: String,
  @Id @GeneratedValue var id: Long? = null
)