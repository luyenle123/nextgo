export function SortOption ({config}) {
    return(
        <div className='pr-0.5 float-right h-6'>
            <span className="text-xs ml-1">Sort: </span>
            <select onChange={config?.handleSortingChanged} value={config?.pageInfo?.sorting} className='bg-white'>
                <option key={1} value={1}>Price: L to H</option>
                <option key={2} value={2}>Price: H to L</option>
                <option key={3} value={3}>Title: A-Z</option>
                <option key={4} value={4}>Title: Z-A</option>
            </select>              
        </div>
    );
  };