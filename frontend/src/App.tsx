import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Container } from '@govtechsg/sgds-react/Container';
import { Pagination } from '@govtechsg/sgds-react/Pagination';

import FileUploader from './components/FileUploader';
import SearchField from './components/SearchField';
import DataDisplayLarge from './components/DataDisplayLarge';
import DataDisplaySmall from './components/DataDisplaySmall';

import { PageMetadata, SearchParams } from './shared/types';

const searchEndpointMap = {
  'invoiceNo': 'findByInvoiceNoContainingIgnoreCase',
  'stockCode': 'findByStockCodeContainingIgnoreCase',
  'description': 'findByDescriptionContainingIgnoreCase',
  'quantity': 'findByQuantity',
  'invoiceDate': 'findByInvoiceDateContaining',
  'unitPrice': 'findByUnitPrice',
  'customerId': 'findByCustomerIdContainingIgnoreCase',
  'country': 'findByCountryContainingIgnoreCase'
}

const useViewport = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return screenWidth;
}

function App() {

  // Controls whether small or large data display style is used
  const screenWidth = useViewport();
  const breakpoint = 820;

  // Fetch data upon file upload complete
  const handleFileUploadComplete = () => {
    getData({field: '', term: ''}, 0);
  };

  // Note that curPage is 1-indexed for Pagination component but 0-indexed for backend
  // Default page size is set at 8
  const [curPage, setCurPage] = useState(1);
  const [pageMetadata, setPageMetadata] = useState<PageMetadata>({size: 8, totalElements: 0, totalPages: 0, number: 0});

  const [searchParams, setSearchParams] = useState<SearchParams>({field: '', term: ''});
  const handleSearch = (searchParams: SearchParams) => {
    setSearchParams(searchParams);
    setCurPage(1);
  };

  const [data, setData] = useState([]);

  const getData = (searchParams: SearchParams, pageNum: number) => {
    let endpoint = '';

    if (searchParams.term === '') {
      endpoint = `/api/transactions?page=${pageNum}&size=${pageMetadata.size}`
    } else {
      endpoint = `/api/transactions/search/${searchEndpointMap[searchParams.field as keyof typeof searchEndpointMap]}?searchTerm=${searchParams.term}&page=${pageNum}&size=${pageMetadata.size}`
    }

    axios.get(endpoint)
    .then((response) => {
      setData(response.data._embedded.transactions);
      setPageMetadata(response.data.page);
    }).catch((error) => {
      setData([]);
      setPageMetadata({...pageMetadata, totalElements: 0, totalPages: 0});
    });
  };

  // Get data on changes to either search or page parameters
  useEffect(() => {
    getData(searchParams, curPage - 1);
  }, [searchParams, curPage]);

  return (
    <Container className='my-5'>
      <h3>Load Data</h3>

      <FileUploader onComplete={handleFileUploadComplete} />
      
      <h3 className='mt-5'>Explore Data</h3>

      <SearchField handleSearch={handleSearch} />

      {screenWidth < breakpoint ? <DataDisplaySmall data={data} /> : <DataDisplayLarge data={data} />}

      <Pagination
        dataLength={pageMetadata.totalElements}
        currentPage={curPage}
        setCurrentPage={setCurPage}
        itemsPerPage={pageMetadata.size}
        limit={8}
        size={'sm'}
        ellipsisOn={false}
        ellipsisJump={0}
      />

    </Container>
  );
}

export default App;
