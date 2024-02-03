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
    <div>
        <Stack direction="horizontal" gap={4}>
        <div className="p-2">
            <h1>ADVERTISMENTS</h1>
        </div>
        </Stack>
        <div className="row my-5">
        {sortedAds.map((ad) => (
          <Col key={ad.id} className="col-lg-4 col-sm-12 col-md-6 px-2 py-2">
             <Card>
              <Card.Body>
                <Card.Img variant="top" src={`${IMAGES_URL}/${ad.photo}`} style={{ height: '20rem', objectFit: 'cover' }} />
                <Card.Title>{ad.title}</Card.Title>
                <Card.Text className="mb-2">
                    <b>Location:</b> {ad.location}
                </Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </div>
    </div>
    );
  }
};
  
  export default AllAds;