import '../../styles/loader.css';

const Loader = ({isActive}) => {
  let display = isActive ? 'loader-main active' : 'loader-main inActive';
  if(isActive === undefined)
  {
    display = 'loader-main active';
  }

  return (
    <>
      <div id='loader' className={display} >
        <div className="loader-bg"></div>        
        <div className='loader-container'>          
          <span className="loader"></span>
        </div>
      </div> 
    </>
  )
}

// const IsLoading = () => {
//     return IsShowLoader();
//   }

//   function IsShowLoader(){
//     const loader = document.getElementById('loader');
//     if(loader){
//         if(loader.classList.contains('active'))
//         {
//           return true;
//         }
//     }
//     return false;
//   }  

const LoaderToggle = (display, callback = undefined) => {
  if(display){
    ShowLoader(true)
  }
  else{
    FadeLoader();
  }

  if(callback){
    callback();
  }  
}


function ShowLoader(show){
  const loader = document.getElementById('loader');
  if(loader)
  {
    if(show){
      loader.style.opacity = "1";
      loader.classList.remove('inActive');
      loader.classList.add('active');      
    }
    else{
      loader.classList.remove('active');
      loader.classList.add('inActive');
    }
  }
}

function FadeLoader() {
  try{
    const loader = document.getElementById('loader');
    if(!loader){
      return;
    }

    let opacity = parseInt( loader.style.opacity);
    if (opacity > 0) {
       opacity -= 0.05;
       setTimeout(function(){FadeLoader()}, 100);
    }
    loader.style.opacity = opacity + '';
  
    if(opacity <=0 )
    {
      ShowLoader(false);
    } 
  }
  catch(err){
    ShowLoader(false);
  }
} 

export { Loader, LoaderToggle }