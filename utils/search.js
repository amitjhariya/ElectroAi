import { search, SafeSearchType } from 'duck-duck-scrape'
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const searchEngine = async (query) => {

    try {
        const searchResults = await search(query, {
            safeSearch: SafeSearchType.STRICT
        });

        const loader = new CheerioWebBaseLoader(
            searchResults.results[0].url
        );
          
        const docs = await loader.load()
        return docs[0].pageContent.substring(0, 2000)
        
    } catch (error) {
        return null
    }
}

export default searchEngine