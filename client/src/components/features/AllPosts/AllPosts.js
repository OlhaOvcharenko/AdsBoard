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
import Search from "../SearchPostForm/Search";

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
          <Col key={ad.id} className="col-lg-4 col-sm-12 col-md-4 mx-3 py-2" style={{ width:'25rem'}}>
             <Card>
              <Card.Body className="p-0">
                <Card.Img variant="top mb-2" src={`${IMAGES_URL}/${ad.photo}`} style={{height: '20rem', objectFit: 'cover' }} />
                <Card.Title className="px-2">{ad.title}</Card.Title>
                <Card.Text className="px-2 py-1">
                    <b>Location:</b> {ad.location}
                </Card.Text>
                <Button variant="secondary" className="m-2">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </div>

      </section>
    );
  }
};
  
  export default AllAds;