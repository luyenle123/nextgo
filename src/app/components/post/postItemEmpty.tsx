export default function PostItemEmpty(props){
    return(
        <>
            <div className='blog-list-item empty-item'>
                <div className='blog-item-header'>
                    <span className='post-title'>A judgment that is necessarily hampered</span>   <span className='view-count'>00 views</span>
                    <span className= {'collap-expand-button '}></span>
                    <div className='blog-item-tag-wrapper'>
                        <span className='tag-label'>tags:</span> <span className='tag-item'>tag1</span> <span className='tag-item'>tag2</span> <span className='tag-item'>tag3</span>
                    </div>
                </div>               
            </div>
        </>
    );
}
