import { useState, useEffect } from "react";
// import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { getImg } from "./images-api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn"


export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

 
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }

    async function fetchImgs() {
      try {
        setLoading(true);
        setError(false);
        const data = getImg(searchQuery, page);
        setImages([data]);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImgs();
  },  [page, searchQuery]);
  
    
  const handleSearch = async (input) => {
    setSearchQuery(input);
    setPage(1);
    setImages([]);
  }
   
  const handleLoadMore = async () => {
    setPage(page + 1);
  };

    return (
      <>
        <SearchBar onSubmit={handleSearch} />
        {images.length > 0 && <ImageGallery items={images} />}


        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {images.length > 0 && !loading && <LoadMoreBtn click={handleLoadMore}/>}
      </>
    );
  }
