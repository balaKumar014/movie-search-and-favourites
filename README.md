Movie Search and Favourites Service API 🎬

This API service enables users to search for movies and manage a list of their favorite movies. It leverages the OMDB API for movie search and a local JSON file to persist the list of favorites.

📦 Installation and Setup
Clone the Repository

        git clone https://github.com/balaKumar014/movie-search-and-favourites

Navigate into the Directory
        
        cd movie-search-and-favourites
        
Install Dependencies

        npm install
       
 Create a .env file in the root directory and add the following:
                
                OMDB_API_KEY=your_omdb_api_key_here
                PORT=8080

Run the Application
        
        npm run start

🔑 Obtaining OMDB API Key
        
        To get an OMDB_API_KEY, visit http://www.omdbapi.com/ and click on the "API Key" tab. Complete the registration form to obtain your free API key.

🎯 Features
        

    Search Movies 🕵️‍♀️
                    
                    Endpoint: https://movie-search-favourites.onrender.com/api/movies/search
                    You can search movies by IMDb ID or title.
                    Sample Body: {"imdbID": "tt15380630"} or {"title": "Kushi"}
                    
    Manage Favorites ❤️
    
                    Endpoint: https://movie-search-favourites.onrender.com/api/movies/favorites
                    Add or remove movies to/from your favorites list by specifying the actionType in the request body.
                    Sample Body to Add to Favorites: { "actionType": "addMovie", "imdbID": "tt15380689800" }
                    Sample Body to Remove from Favorites: { "actionType": "removeMovie", "imdbID": "tt15380689800" }

Swagger

    https://movie-search-favourites.onrender.com/docs/

Postman Collection was attached [Movie Search and Favourites.postman_collection.json](https://github.com/balaKumar014/movie-search-and-favourites/files/13199325/Movie.Search.and.Favourites.postman_collection.json)

📢 Important Note

:warning: The application is deployed on a free subscription with Render.com. It might take some time to load initially. Thank you for your patience.
