import '../../styles/loader.css';
// import {Spinner} from "@nextui-org/spinner";

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
          <span id='loader-spin' className="loader"></span>
          {/* <div>Loading...</div> */}

          {/* <Spinner size="lg" label="Loading..." /> */}

        </div>
      </div> 
    </>
  )
}

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
  //const spinelm = document.getElementById('loader-spin');
  if(loader)
  {
    if(show){
      loader.style.opacity = "1";
      //spinelm.style.opacity = "1";
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
    //const spinelm = document.getElementById('loaderspin');
    if(!loader){
      return;
    }

    let opacity = parseInt( loader.style.opacity);
    if (opacity > 0) {
       opacity -= 0.01;
       setTimeout(function(){FadeLoader()}, 10);
    }
    loader.style.opacity = opacity + '';
    //spinelm.style.opacity = opacity + '';
  
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