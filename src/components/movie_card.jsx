

function movie_card({movie}) {


    function onFavoriteClick(){
   alert("Clicked")


    }

    return  <article className="group flex h-full flex-col overflow-hidden bg-[#242424] transition duration-200 hover:-translate-y-1 hover:bg-[#303030]">
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#242424]">
        
                     <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src= {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}   alt={movie.title} />
              
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">

                          <button aria-label={`Add ${movie.title} to favorites`} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-rose-500" onClick={onFavoriteClick}>
                              🤍
                          </button>
                       </div>
              </div>

                       <div className="flex flex-1 flex-col gap-1 p-3">
                           <h3 className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</h3>
                           <p className="text-xs text-white/50">{movie.release_date || "Release date unavailable"}</p>
                      </div>


    

    </article>

  
     

    }


export default movie_card;