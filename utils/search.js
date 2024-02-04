import { search,SafeSearchType } from 'duck-duck-scrape'





const searchEngine = async (query) => {
    try {
        const searchResults = await search(query, {
            safeSearch: SafeSearchType.STRICT
        });
    
        return searchResults.results[0]
    } catch (error) {
        return null
    }
}

export default searchEngine