

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchMovies } from '../services/movies.api'
import MoviesGrid from '../components/moviesGrid'


const MoviesSearchPage = () => {
  const { query } = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ hasMore, sethasMore ] = useState(true)
  const [ page, setpage ] = useState(1)
  const [ showBackToTop, setShowBackToTop ] = useState(false)

   const fetchSearchedMovies = async (nextpage = 1) => {
      setLoading(true)
      setError(null)

        try {
          const res = await searchMovies({ searchQuery: query, page: nextpage })
          if (res.length == 0){
            sethasMore(false)
            return 
          } 
          if(res.length < 20) sethasMore(false)
          setMovies((prev) => [...prev, ...res])
          setpage(nextpage)
        } catch (error) {
          console.error(error)
          setError("Failed to load search results. Please try again.")
        } finally {
          setLoading(false)
        }
    }

  useEffect(() => {
    setpage(1);
    sethasMore(true);
    setMovies([])
    fetchSearchedMovies();
  }, [query]);

  useEffect(()=> {
        
         const onScroll = () => {
                setShowBackToTop(window.scrollY > 500);
               if(!hasMore || loading) return
                const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 220
                if(reachedBottom){
                    fetchSearchedMovies(page + 1)
                }
         }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll",onScroll)
        },[hasMore,loading,page])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }



  return (
    <section className="min-h-[calc(100vh-76px)] bg-[radial-gradient(circle_at_top_right,_rgba(229,9,20,0.18),_transparent_30rem)] py-8 sm:py-10">
      <header className="mb-8 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="min-w-0 break-words text-2xl font-bold text-white sm:text-3xl">
            Search Results for “{query}”
          </h1>
          <span className="text-sm text-gray-400">
            {loading ? "Searching..." : `${movies.length} results`}
          </span>
        </div>
      </header>

      {error && 
        <div className="rounded-xl border border-red-800/80 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
       }
      
      {movies.length > 0 ? (
        <div className="pb-10">
          <MoviesGrid movies={movies} />
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 text-center text-sm text-gray-400">
          No movies found for “{query}”. Try a different search.
        </div>
      )}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-5 z-10 rounded-full border border-white/20 bg-[#e50914] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:bg-[#f6121d] focus:outline-none focus:ring-2 focus:ring-rose-300 sm:bottom-8 sm:right-8"
        >
          Back to top
        </button>
      )}
      {loading && (
        <div className="mt-6 text-center text-sm text-gray-400">
          Loading more results...
        </div>
      )}
      
       
      
    </section>
  )
}

export default MoviesSearchPage