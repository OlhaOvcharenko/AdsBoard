
import { getAllAds, getRequest, getRequests, LOAD_ADS } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import Search from "../SearchForm/SearchForm";
import AdCard from "../AdCard/AdCard";

const AllAds = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  console.log(ads);
  const requests = useSelector(getRequests);
  console.log(requests)

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  const sortedAds = ads.slice().sort((a, b) => a.title.localeCompare(b.title));

  return (
    (requests['app/ads/LOAD_ADS'] && requests['app/ads/LOAD_ADS'].success && ads.length > 0) ? (
      <section className="Posts">
        <h1 className="text-center py-4">ADVERTISEMENTS</h1>
        <Search />
        <div className="row my-3">
          {sortedAds.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </section>
    ) : (
      <Spinner color="primary" className="standard-box d-block me-auto ms-auto" />
    )
  );
};
  
  export default AllAds;