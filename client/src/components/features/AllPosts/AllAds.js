import { Stack } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import { getAllAds, getRequest, LOAD_ADS } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import Search from "../SearchForm/SearchForm";
import AdCard from "../AdCard/AdCard";

const AllAds = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const request = useSelector(state => getRequest(state, LOAD_ADS));
  console.log(request, 'requests');
  console.log(ads, 'ads');

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  const sortedAds = ads.slice().sort((a, b) => a.title.localeCompare(b.title));

  if (!request || !request.success) {
    return <Spinner color="primary" className="standard-box d-block me-auto ms-auto" />;
  } else {
    return (
      <section className="Posts">
        <h1 className="text-center py-4"> ADVERTISMENTS</h1>
        <Search />
        <div className="row my-3">
        {sortedAds.map((ad) => (
          <AdCard key={ad.id} photo={ad.photo} title={ad.title} author={ad.author} />))}
        </div>

      </section>
    );
  }
};
  
  export default AllAds;