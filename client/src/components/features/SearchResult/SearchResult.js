import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";
import { Col, Card, Button } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SearchResult = () => {
  const { searchPhrase } = useParams();
  const ads = useSelector(getAllAds);
  console.log(ads);
  const searchedAds = ads.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()));
  //const searchedAds = useSelector((state) => getSearchedAds(state, searchPhrase));
  

  return (
    <section className="Searched Ads">
      <div className="row my-3">
      {searchedAds.map((ad) => (
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
      <Nav.Link as={NavLink} to="/" >
        Back to all ads
      </Nav.Link>
    </section>
  );

 
};

export default SearchResult;