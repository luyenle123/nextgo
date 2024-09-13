
export default function ProductRating({rating}) {
    const stars = [];
    const intNumber = parseInt(rating);
    for (let i = 1; i <= intNumber; i++) {
      stars.push('star');
    }
  
    if(intNumber < 5){
      for (let i = intNumber; i < 5; i++) {
        stars.push('star-inactive');
      }
    }
  
    return(
      <div className="flex float-right mt-1">
          {stars.map((st, i) => (
              <div key={i} className={st}></div>
          ))}
      </div>
    );
}
