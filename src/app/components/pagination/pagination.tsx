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
        <div className="w-full h-fit">
            <div className='sm:hidden float-left h-5'>
                <span>Page: </span>
                <select className='min-w-10 bg-white' onChange={config.handlePaginationNumberClick} value={config.pageInfo.page}>
                    {config.pageInfo.allPaginationNumbers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                <span>of {config.pageInfo.totalPage} / {config.pageInfo.total} entries</span>
            </div>

            <div className='hidden sm:inline-block float-left'>
                <PButton page={-90} text = {'<<'} isActive={false} pageNumberClick={config.handleBackClick}/>
                {config.pageInfo.paginationNumbers.map((p, i) => (
                    <PaginationButton key={i} pageinfo={config.pageInfo} page={p} pageNumberClick={config.handlePaginationNumberClick}/>
                ))}
                <PButton page={-91} text = {'>>'} isActive={false} pageNumberClick={config.handleNextClick}/>

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

                {/* <SortOption config={config}/> */}
            </div>

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
            <span className="ml-2 text-sm">page {config.pageInfo.page} of {config.pageInfo.totalPage} / Showing {config.pageInfo.showFrom} to {config.pageInfo.showTo} of {config.pageInfo.total} entries</span>
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
                <span className="ml-2 text-xs">Show: </span>
                <select className='w-12 h-7 bg-white' onChange={config.handleItemDisplayChanged} value={config.pageInfo.pageSize}>
                    <option key={1} value={8}>8</option>
                    <option key={2} value={12}>12</option>
                    <option key={3} value={16}>16</option>
                    <option key={4} value={20}>20</option>
                    <option key={5} value={40}>40</option>
                    <option key={6} value={60}>60</option>
                    <option key={7} value={100}>100</option>
                </select>
                <span className="text-xs ml-1">Entries</span>
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
            <div className='pr-0.5 float-right h-6'>
                <span className="text-xs ml-1">Sort: </span>
                <select onChange={config.handleSortingChanged} value={config.pageInfo.sorting} className='bg-white'>
                    <option key={1} value={1}>Price: L to H</option>
                    <option key={2} value={2}>Price: H to L</option>
                    <option key={3} value={3}>Title: A-Z</option>
                    <option key={4} value={4}>Title: Z-A</option>
                </select>              
            </div>
        );
    }
};

export function PaginationButton({pageinfo, page, pageNumberClick}){
    const currentPage = parseInt(page);
    if(currentPage > 0){
        return(
            <PButton page={currentPage} text = {currentPage} isActive={pageinfo.page === currentPage} pageNumberClick={pageNumberClick}/>
        );
    }
    else{
        pageNumberClick = ()=>{};
        return(
            <PButton page={page} text={'...'} isActive={false} pageNumberClick={pageNumberClick}/>
        );
    }
}

export function PButton({page, text, isActive, pageNumberClick}){

    const bg = isActive ? 'bg-gray-400' : 'bg-gray-200 cursor-pointer';
    if(isActive){
        pageNumberClick = ()=>{};
    }
    return(
        // <div className={'h-8 min-w-8 py-0.5 px-1 mr-1 pt-1.5 text-center ' + bg} key={page} onClick={pageNumberClick} >{ text }</div>
        <button className={'h-7 min-w-7 py-0.5 px-1 mr-1 ' + bg} key={page} onClick={pageNumberClick} value={page}>{ text }</button>
    );
}