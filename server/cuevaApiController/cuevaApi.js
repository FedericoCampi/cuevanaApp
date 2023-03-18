import cheerio from "cheerio";
import axios from "axios";

const BASE_URL = 'https://w4.cuevana3.ai/'
const MOVIES = ['', 'estrenos', 'peliculas-mas-vistas', 'peliculas-mas-valoradas', 'peliculas-latino', 'peliculas-espanol', 'peliculas-subtituladas']
//#tabserie-1: LastAddedSeries, #tabserie-2: getSeriesPremiere, #tabserie-3: getSeriesRanking, #tabserie-4: getSeriesMostViewed, index(4): lastEpisodes
const SERIES = ['#tabserie-1', '#tabserie-2', '#tabserie-3', '#tabserie-4', '#aa-wp > div > div.TpRwCont.cont > main > section:nth-child(1)']
const GENRES = ['accion', 'animacion', 'aventura', 'belico-guerra', 'biografia', 'ciencia-ficcion', 'comedia', 'crimen', 'documentales', 'drama', 'familiar', 'fantasia', 'misterio', 'musical', 'romance', 'terror', 'thriller']

export const getMoviesCueva = async(req, res) =>{
    try {
        const movieType = await req.params.type
        const tipo = movieType ? movieType : 0
        const html = await axios.get(`${BASE_URL}${MOVIES[tipo]}`);
        const $ = cheerio.load(html.data);
        const promises = [];
        const url = tipo > 0 ? '#aa-wp > div > div > main > section' : '#tab-1';
        $(`${url} > ul > li`).each((index , element) =>{
            const $element = $(element);
            const id = $element.find('div.TPost.C > a').attr('href').split('ai/')[1];
            const title = $element.find('div.TPost.C > a > h2').text();
            const poster = $element.find('div.TPost.C > a > div > figure > img').attr('data-src');
            const year = $element.find('div.TPost.C > a > div > span.Year').text();
            const sypnosis = $element.find('div.TPMvCn > div.Description > p:nth-child(2)').text();
            const rating = $element.find('div.TPMvCn > p.Info > span.Vote').text();
            const duration = $element.find('div.TPMvCn > p.Info > span.Time').text();
            const director = $element.find('div.TPMvCn > div.Description > p.Director').text().replace('Director: ','').split(', ');
            const genres = $element.find('div.TPMvCn > div.Description > p.Genre').text().replace('Género: ','').split(', ');
            const cast = $element.find('div.TPMvCn > div.Description > p.Actors').text().replace('Actores: ','').split(', ');

            promises.push({
            id: id.substring(0, 5) || null,
            title: title || null,
            poster: poster || null,
            year: year || null,
            sypnosis: sypnosis || null,
            rating: rating || null,
            duration: duration || null,
            director: director || null,
            genres: genres || null,
            cast: cast || null
            })
        })
        const allMovies = await Promise.all(promises)
        res.send(allMovies)
    } catch (error) {
        console.log(error)
    }
}
export const getLinksByNewId = async(req, res) => {
    try {
        const movieName = await req.params.query
        const html = await axios.get(`${BASE_URL}page/1?s=${movieName.replace(/ /g,'+')}`);
        const $ = cheerio.load(html.data);
        const promises = [];

        $(`#aa-wp > div > div > main > section > ul > li`).each((index , element) =>{
            const $element = $(element);
            const id = $element.find('div.TPost.C > a').attr('href').split('ai/')[1];
            const title = $element.find('div.TPost.C > a > h2').text();
            const poster = $element.find('div.TPost.C > a > div > figure > img').attr('data-src');
            const year = $element.find('div.TPost.C > a > div > span.Year').text();
            const sypnosis = $element.find('div.TPMvCn > div.Description > p:nth-child(2)').text();
            const rating = $element.find('div.TPMvCn > p.Info > span.Vote').text();
            const duration = $element.find('div.TPMvCn > p.Info > span.Time').text();
            const director = $element.find('div.TPMvCn > div.Description > p.Director').text().replace('Director: ','').split(', ');
            const genres = $element.find('div.TPMvCn > div.Description > p.Genre').text().replace('Género: ','').split(', ');
            const cast = $element.find('div.TPMvCn > div.Description > p.Actors').text().replace('Actores: ','').split(', ');
        
            promises.push({
                id: id || null
            })
        })
        const allMovies = await Promise.all(promises)
        const links = await getLinks(allMovies[0].id.substring(0, 5))
        res.send(links) 
    } catch (error) {
        console.log(error)
    }
}
export const getLinks = async(req, res) => {
    try {
        // const movieID = await req.params.id
        const html = await axios.get(`${BASE_URL}${req}`);
        const $ = cheerio.load(html.data);
        const promises = [];

        const latino = [];
        for(let i = 1; i < 11; i++){
            const url = $(`#OptL${i} > iframe`).attr('data-src');
            if(url !== undefined) {
                latino.push({
                url: 'https:' + url,
                })
            }
        }
        const espanol = [];
        for(let i = 1; i < 11; i++){
            const url = $(`#OptE${i} > iframe`).attr('data-src');
            if(url !== undefined) {
                espanol.push({
                url: 'https:' + url,
                })
            }
        }
        const sub = [];
            for(let i = 1; i < 11; i++){
            const url = $(`#OptS${i} > iframe`).attr('data-src');
            if(url !== undefined) {
                sub.push({
                url: 'https:' + url,
                })
            }
        }
        promises.push({
        latino: latino,
        espanol: espanol,
        sub: sub,
        });

        const allUrls = await Promise.all(promises)
        return allUrls
    } catch (error) {
        console.log(error)
    }
}