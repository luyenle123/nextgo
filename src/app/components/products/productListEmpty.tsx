import ProductCardEmpty from "./productCardEmpty";

export default function ProductListEmpty(){
  return(
    <div className="lg:flex clear-both min-h-svh mt-2 mb-2">    
      <div className="float-left sm:float-none md:float-none w-full lg:w-80 h-auto min-w-80">
        
      </div>
      
      <div className="float-left sm:float-none md:float-none">
        <div className="glimmer-line" />
          
        <div className="flex flex-wrap justify-left float-left">
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 relative">
            <ProductCardEmpty/>
          </div>    
        </div>

        <div className="glimmer-line" />
      </div>
    </div>    
  );
}