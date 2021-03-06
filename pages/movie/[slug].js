import Head from 'next/head'
import Description from './../../components/Description/index'

export default function SinglePage( { movie } ) {
  return(     
    <>
      <Head>
        <title>{movie.title} | Star Wars</title>
        <meta name="description" content={`A brief description of the classic film ${movie.title}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Description movie={ movie } />
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://swapi.dev/api/films/')
  const movies = await res.json()

  const paths = movies.results.map((movie, index) => ({
    params: { 
      slug: (index + 1).toString()
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps( { params } ) {
  const res = await fetch(`https://swapi.dev/api/films/${params.slug}/`)
  const movie = await res.json()
  
  return { 
    props: { 
      movie
    }
  }
}
