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
    FadeOut();
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
      FadeIn();      
      loader.classList.remove('inActive');
      loader.classList.add('active');      
    }
    else{
      loader.classList.remove('active');
      loader.classList.add('inActive');
    }
  }
}

function FadeIn() {
  try{
    const loader = document.getElementById('loader');
    if(!loader){
      return;
    }

    let opacity = 0;
    const fadeEffect = setInterval(function () {
      if (opacity < 1) {
        opacity += 0.1;
      } else {
          clearInterval(fadeEffect);
      }
      loader.style.opacity = opacity + '';
    }, 1);    
  }
  catch(err){
  }
} 

function FadeOut() {
  try{
    const loader = document.getElementById('loader');
    if(!loader){
      return;
    }

    let opacity = parseInt( loader.style.opacity);
    const fadeEffect = setInterval(function () {
      if (opacity > 0) {
        opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);
          ShowLoader(false);
      }
      loader.style.opacity = opacity + '';
    }, 1);    
  
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