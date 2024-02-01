import { Stack } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import { getAllAds, getRequest, LOAD_ADS } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";

const AllAds = () => {
    const dispatch = useDispatch();
    const ads = useSelector(getAllAds);
    const request = useSelector(state => getRequest(state, LOAD_ADS));
    console.log(request, 'requests');
  
    useEffect(() => {
      dispatch(loadAdsRequest());
    }, [dispatch]);
    
    if (!request || !request.success) {
      return <Spinner color="primary" className="standard-box d-block me-auto ms-auto" />;
    } else {
      return (
        <div>
          <Stack direction="horizontal" gap={4}>
            <div className="p-2">
              <h1>All ads</h1>
            </div>
          </Stack>
          <div className="row my-5">
            {ads.map((ad) => (
              <Col key={ad.id} className="col-lg-4 col-sm-12 col-md-6 px-2 py-2">
                <Card>
                  <Card.Body>
                    <Card.Title>{ad.title}</Card.Title>
                    <Card.Text className="mb-2">
                      <b>Author:</b> {ad.author.login}
                    </Card.Text>
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