


const api_key = "8b199042aa185de7113d9f12d90d04f0";
const base_Url = 'https://api.themoviedb.org/3' 



 export const getpopularmovies = async ({pages}) =>{

  const response = await fetch(`${base_Url}/movie/popular?api_key=${api_key}&page=${pages}`);
  const data = await response.json();
  
  
   console.log("popular");
   console.log(pages);
   
   
  
   return data.results

 };

 export const searchmovies = async ({searchQuery,pages}) =>{
 
  const response = await fetch(`${base_Url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${pages}`);
  const data = await response.json();
    console.log("search");
    console.log(pages);
    
    
   return data.results

 };
