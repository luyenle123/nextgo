const BuildSortParam = (type) => {
  switch(type){
      case(1):
          return 'sortBy=price&order=asc';
      case(2):
          return 'sortBy=price&order=desc';
      case(3):
          return 'sortBy=title&order=asc';
      case(4):
          return 'sortBy=title&order=desc';
      default:
          return 'sortBy=price&order=asc';
  }
}

const  GetPageInfo = (total:number, resultLength:number, page, pageSize:number, sorting) => {
    const totalPageinD = total / pageSize;
    let totalPageInt = parseInt(totalPageinD +'');
    if(totalPageInt < totalPageinD)
        totalPageInt +=1;
    const totalPage = totalPageInt;

    const pageNumber = parseInt(page+'');
    const currentEntries = ((pageNumber - 1) * pageSize) + resultLength; //res.products.length;

    const paginationNumbers = [];
    const currentPage = parseInt(page);    
    const pageRender = 5;

    if(currentPage < pageRender ){
      
      if(totalPage < pageRender){
        for (let i = 1; i <= totalPage; i++) {
          paginationNumbers.push(i);
        }
      }
      else{
        for (let i = 1; i <= pageRender; i++) {
          paginationNumbers.push(i);
        }
        paginationNumbers.push(0);
        paginationNumbers.push(totalPage);
      }
    }
    else if (currentPage >= (totalPage - 5)){
      paginationNumbers.push(1);
      paginationNumbers.push(-1);

      for (let i = (totalPage - 4); i <= totalPage; i++) {
        paginationNumbers.push(i);
      }
    }
    else{
      
      paginationNumbers.push(1);
      paginationNumbers.push(-1);

      paginationNumbers.push(currentPage - 1);
      paginationNumbers.push(currentPage);
      paginationNumbers.push(currentPage + 1);

      paginationNumbers.push(-2);
      paginationNumbers.push(totalPage);
    }

    const allPaginationNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      allPaginationNumbers.push(i);
    }
    
    let showFrom = (parseInt(page+'') - 1) * pageSize;
    const showTo = showFrom + resultLength;
    showFrom ++;

    return {
        total: total, 
        currentEntry: currentEntries,
        totalPage: totalPage, 
        page: pageNumber,
        pageSize: pageSize,
        sorting: sorting,
        paginationNumbers: paginationNumbers,
        allPaginationNumbers: allPaginationNumbers,
        showFrom: showFrom,
        showTo: showTo
    };
}

export {GetPageInfo, BuildSortParam};