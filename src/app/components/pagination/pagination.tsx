/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../styles/pagination.css';

const handlePaginationNumberClick = (e) => {};
const handleBackClick = (e) => {};
const handleNextClick = (e) => {};
const handleAddToCartClick = (e) => {};
const handleItemDisplayChanged = (e) => {};
const handleSortingChanged = (e) => {};

export const GetConfig = (isLoading, hasData, pageInfo) => {
    return {
        isLoading: isLoading,
        pageInfo: pageInfo,
        hasData: hasData,
        hideSortOption: false,
        hideDisplayOption: false,
        hideDisplayPageInfo: false,
        hidePageDropDownInfo: false,
        hideTotalItem: false,
        handlePaginationNumberClick: handlePaginationNumberClick,
        handleBackClick:handleBackClick,
        handleNextClick:handleNextClick,
        handleAddToCartClick:handleAddToCartClick,
        handleItemDisplayChanged: handleItemDisplayChanged,
        handleSortingChanged: handleSortingChanged
    } 
}

export const CloneConfig = (config) => {
    return {
        isLoading: config.isLoading,
        pageInfo: config.pageInfo,
        hasData: config.hasData,
        hideSortOption: config.hideSortOption,
        hideDisplayOption: config.hideDisplayOption,
        hideDisplayPageInfo: config.hideDisplayPageInfo,
        hidePageDropDownInfo: config.hidePageDropDownInfo,
        hideTotalItem: config.hideTotalItem,
        handlePaginationNumberClick: config.handlePaginationNumberClick,
        handleBackClick:config.handleBackClick,
        handleNextClick:config.handleNextClick,
        handleAddToCartClick:config.handleAddToCartClick,
        handleItemDisplayChanged: config.handleItemDisplayChanged,
        handleSortingChanged: config.handleSortingChanged
    } 
}

export const Pagination = ({config}) => {
    //console.log('Pagination');

    if(config === undefined){
        config = GetConfig(false, false, {});       
    }

    return(
        <div className="pagination">
            <button onClick={config.handleBackClick} className="pagination-number">&lt;&lt;</button>
            {config.pageInfo.paginationNumbers.map((p, i) => (
                <PaginationButton key={i} pageinfo={config.pageInfo} page={p} pageNumberBlick={config.handlePaginationNumberClick}/>
            ))}
            <button onClick={config.handleNextClick} className="pagination-number">&gt;&gt;</button>

            {config.hidePageDropDownInfo ? <></> : 
                <select onChange={config.handlePaginationNumberClick} value={config.pageInfo.page}>
                    {config.pageInfo.allPaginationNumbers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>            
            }

            { config.hideTotalItem ? <></> : <span>{config.pageInfo.total} entries</span> }

            <DisplayPageInfo config={config}/>

            <DisplayOption config={config}/>

            <SortOption config={config}/>

        </div>
    );
};

export function DisplayPageInfo ({config}) {
    if(config === undefined){ return;}
    if(config.hideDisplayPageInfo){
        return(
            <></>
        );
    }
    else{
        return(
            <span className="page-number">page {config.pageInfo.page} of {config.pageInfo.totalPage} / Showing {config.pageInfo.showFrom} to {config.pageInfo.showTo} of {config.pageInfo.total} entries</span>
        );
    }
};

export function DisplayOption ({config}) {
    if(config === undefined){ return;}
    if(config.hideDisplayOption){
        return(
            <></>
        );
    }
    else{
        return(
            <>
                &nbsp;
                <span className="page-number">Show: </span>
                <select onChange={config.handleItemDisplayChanged} value={config.pageInfo.pageSize}>
                    <option key={1} value={8}>8</option>
                    <option key={2} value={12}>12</option>
                    <option key={3} value={16}>16</option>
                    <option key={4} value={20}>20</option>
                    <option key={5} value={40}>40</option>
                    <option key={6} value={60}>60</option>
                    <option key={7} value={100}>100</option>
                </select>
                <span className="other-text ml-1">Entries</span>
            </>
        );
    }
};

export function SortOption ({config}) {
    if(config === undefined){ return;}
    if(config.hideSortOption){
        return(
            <></>
        );
    }
    else{
        return(
            <>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="page-number">Sort: </span>
                <select onChange={config.handleSortingChanged} value={config.pageInfo.sorting}>
                    <option key={1} value={1}>Price: L to H</option>
                    <option key={2} value={2}>Price: H to L</option>
                    <option key={3} value={3}>Title: A-Z</option>
                    <option key={4} value={4}>Title: Z-A</option>
                </select>              
            </>
        );
    }
};

export function PaginationButton({pageinfo, page, pageNumberBlick}){
    const currentPage = parseInt(page);
    if(currentPage > 0){
        return(
            <button className={pageinfo.page === currentPage ? 'pagination-number-active' : 'pagination-number'} key={currentPage} onClick={pageNumberBlick} value={currentPage}>{currentPage}</button>
        );
    }
    else{
        return(
            <button className='pagination-number-empty' key={page} >...</button>
        );
    }
}