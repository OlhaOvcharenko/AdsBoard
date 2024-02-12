import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getSearchedAds } from "../../../redux/adsRedux";
import Search from "../SearchForm/SearchForm";
import AdCard from "../AdCard/AdCard";
import { Alert } from "react-bootstrap";

const SearchResult = () => {
  const { searchPhrase } = useParams();
  
  const searchedAds = useSelector((state) => getSearchedAds(state, searchPhrase));
  
  return (
    <section className="Searched Ads">

      <div className="row my-3">
      <Search />
      {searchedAds.map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
      </div>

      {!searchedAds.length && (
      <Alert>
        <Alert.Heading>Nothing maches with your search request...</Alert.Heading>
      </Alert> 
      )}

    </section>
  );
};

export default SearchResult;