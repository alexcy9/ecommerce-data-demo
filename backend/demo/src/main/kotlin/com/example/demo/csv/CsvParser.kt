package com.example.demo.csv

import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader

import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.apache.commons.csv.CSVRecord
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import kotlin.collections.mutableListOf

import com.example.demo.data.Transaction
import com.example.demo.data.TransactionRepository

@Service
class CsvParser @Autowired constructor(val repository: TransactionRepository) {

  fun saveCsvContents(file: MultipartFile) {
    try {
      var transactions: List<Transaction> = csvToList(file.getInputStream())
      repository.saveAll(transactions)
    } catch (e: IOException) {
      throw RuntimeException("Failed to save file")
    }
  }

  fun csvToList(inputStream: InputStream): List<Transaction> {
    var transactions: ArrayList<Transaction> = arrayListOf()

    var reader: BufferedReader? = null
    var csvParser: CSVParser? = null

    try {
      reader = BufferedReader(InputStreamReader(inputStream, "UTF-8"))
      csvParser = CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())

      for (record in csvParser.getRecords()) {
        transactions.add(Transaction(
          record.get("InvoiceNo"), 
          record.get("StockCode"), 
          record.get("Description"), 
          record.get("Quantity").toInt(), 
          record.get("InvoiceDate"), 
          record.get("UnitPrice").toDouble(), 
          record.get("CustomerID"), 
          record.get("Country")))
      }
    } catch (e: IOException) {
      throw RuntimeException("Failed to parse file")
    } finally {
      csvParser?.close()
      reader?.close()
    }

    return transactions
  }

}