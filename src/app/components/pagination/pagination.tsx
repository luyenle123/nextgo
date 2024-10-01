/* eslint-disable @typescript-eslint/no-unused-vars */
const handleAddToCartClick = (e) => {};
const handleItemDisplayChanged = (e) => {};
const handleLoadMoreClick = (e) => {};
const handleSortingChanged = (e) => {};
const PageChanged = (page, paggeSize) => {}  

export const GetConfig = (isLoading, hasData, pageInfo) => {
    return {
        isLoading: isLoading,
        pageInfo: pageInfo,
        hasData: hasData,
        hideSortOption: false,
        hideDisplayOption: false,
        hideDisplayPageInfo: false,
        hidePageDropDownInfo: false,
        hidePageOption: false,
        hideTotalItem: false,
        loadMoreOnly: false,
        handleAddToCartClick:handleAddToCartClick,
        handleLoadMoreClick: handleLoadMoreClick,
        handleSortingChanged: handleSortingChanged,
        handleItemDisplayChanged: handleItemDisplayChanged,
        PageChanged: PageChanged
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
        loadMoreOnly: config.loadMoreOnly,
        hidePageOption: config.hidePageOption,
        handleLoadMoreClick: config.handleLoadMoreClick,
        handleAddToCartClick:config.handleAddToCartClick,
        handleItemDisplayChanged: config.handleItemDisplayChanged,
        PageChanged: config.PageChanged
    } 
}

export const Pagination = ({config}) => {
    const handlePaginationNumberClick = (e) => {
        if(parseInt(e.target.value) === config.pageInfo.page) return;
        if(config.PageChanged)
        {
            config.PageChanged(e.target.value, config.pageInfo.pageSize);
        }
    };
    const handleBackClick = (e) => {
        if(config.pageInfo.page <= 1) return;
        let page = config.pageInfo.page-1;
        if(page <= 0){ page = 1}
        
        if(config.PageChanged)
        {
            config.PageChanged(page, config.pageInfo.pageSize);
        }
    };

    const handleNextClick = (e) => {
        if(config.pageInfo.page >= config.pageInfo.totalPage) return;
        let page = config.pageInfo.page + 1;
        if(page > config.pageInfo.totalPage){ 
            page = config.pageInfo.page
        }
        
        if(config.PageChanged)
        {
            config.PageChanged(page, config.pageInfo.pageSize);
        }
    };

    const handleItemDisplayChanged = (e) => {
        const newPageSize = parseInt(e.target.value);

        if(config.PageChanged)
        {
            config.PageChanged(config.pageInfo.page, newPageSize);
        }        
    }; 

    const handleLoadMoreClick = (e) => {
        const page = config.pageInfo.page + 1;
        if(page > config.pageInfo.totalPage){ return; }

        if(config.PageChanged)
        {
            config.PageChanged(page, config.pageInfo.pageSize);
        }       
    
    };     

    if(config === undefined){
        config = GetConfig(false, false, {});       
    }

    if(config.loadMoreOnly){
        return(
            <>
                <div className='w-full inline-block text-center pt-10 pb-5'>
                    <button className='min-w-80 px-5 py-3 bg-gray-200 cursor-pointer hover:bg-gray-300 active:bg-gray-200' onClick={handleLoadMoreClick}>Load More (<span className='font-bold'>{config.pageInfo.remainingCount}</span> items)</button>
                </div>            
            </>
        );
    }

    return(
        <div className="w-full h-7">
            <div className='sm:hidden float-left h-5'>
                <span>Page: </span>
                <select className='min-w-10 bg-white' onChange={handlePaginationNumberClick} value={config.pageInfo.page}>
                    {config.pageInfo.allPaginationNumbers.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                <span>of {config.pageInfo.totalPage} / {config.pageInfo.total} entries</span>
            </div>

            <div className='hidden sm:inline-block float-left'>
                <PButton page={-90} text = {'<<'} isActive={false} pageNumberClick={handleBackClick}/>
                {config.pageInfo.paginationNumbers.map((p, i) => (
                    <PaginationButton key={i} pageinfo={config.pageInfo} page={p} pageNumberClick={handlePaginationNumberClick}/>
                ))}
                <PButton page={-91} text = {'>>'} isActive={false} pageNumberClick={handleNextClick}/>

                {config.hidePageDropDownInfo ? <></> : 
                    <select onChange={handlePaginationNumberClick} value={config.pageInfo.page}>
                        {config.pageInfo.allPaginationNumbers.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>            
                }

                { config.hideTotalItem ? <></> : <span>{config.pageInfo.total} entries</span> }

                <DisplayPageInfo config={config}/>

                <DisplayOption config={config} handleItemDisplayChanged={handleItemDisplayChanged}/>

            </div>
        </div>
    );
};

export const PaginationEmpty = () => {
    const config  = {
        pageInfo: {
            sorting: '1'
        },
        hideSortOption: false,
        handleSortingChanged: ()=>{}        
    };
    return(
        <>
        <div className="w-full h-7 blur-sm">
            <div className='hidden sm:inline-block float-left'>
                <PButton page={-90} text = {'<<'} isActive={false} pageNumberClick={() => {}}/>

                <PButton page={1} text={1} isActive={true} pageNumberClick={() => {}}/>
                <PButton page={2} text={2} isActive={false} pageNumberClick={() => {}}/>
                <PButton page={3} text={3} isActive={false} pageNumberClick={() => {}}/>
                <PButton page={4} text={4} isActive={false} pageNumberClick={() => {}}/>
                <PButton page={5} text={5} isActive={false} pageNumberClick={() => {}}/>
                <PButton page={6} text={'...'} isActive={false} pageNumberClick={() => {}}/>
                <PButton page={7} text={20} isActive={false} pageNumberClick={() => {}}/>

                <PButton page={-91} text = {'>>'} isActive={false} pageNumberClick={() => {}}/>

                { <span>100 entries</span> }

            </div>
            <SortOption config={config}/>
        </div>
        </>
    );
}

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

export function DisplayOption (props) {
    if(props.config === undefined){ return;}
    if(props.config.hideDisplayOption){
        return(
            <></>
        );
    }
    else{
        return(
            <>
                &nbsp;
                <span className="ml-2 text-xs">Show: </span>
                <select className='w-12 h-7 bg-white' onChange={props.handleItemDisplayChanged} value={props.config.pageInfo.pageSize}>
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