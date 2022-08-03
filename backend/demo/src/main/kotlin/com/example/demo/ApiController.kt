package com.example.demo

import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.multipart.MultipartFile
import org.springframework.beans.factory.annotation.Autowired

import com.example.demo.csv.CsvParser

@RepositoryRestController
class ApiController @Autowired constructor(val csvParser: CsvParser) {

  @PostMapping("/transactions")
  fun handleFileUpload(@RequestParam("file") file: MultipartFile): ResponseEntity<ResponseMessage> {
    try {
      csvParser.saveCsvContents(file)
      return ResponseEntity(HttpStatus.CREATED)
    } catch (e: Exception) {
      return ResponseEntity(ResponseMessage(e.message), HttpStatus.BAD_REQUEST)
    }
  }

}