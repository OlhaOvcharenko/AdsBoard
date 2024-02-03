import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getAdById } from "../../../redux/adsRedux";

const Ad = (props) => {

    const { adId } = useParams();

    const adData = useSelector(state => getAdById(state, adId));

    if(!adData) return <Navigate to="/" />
    else return(

        <Row className="justify-content-center">
            <Col  className="col-lg-6">
                <Row>
                    <Col>
                    <h1  className={'px-3'}>{adData.title}</h1>
                    </Col>
                </Row>
                <Card className="border-0" >
                    <Card.Body>
                    <Card.Img variant="top mb-2" src={`${IMAGES_URL}/${adData.photo}`} style={{height: '20rem', objectFit: 'cover' }} />
                    <Card.Text dangerouslySetInnerHTML={{ __html: adData.description }}></Card.Text>
                    <Card.Text className="mb-3"><b>Location:</b> {adData.location}</Card.Text>
                    <Card.Text className="mb-3"><b>Author:</b> {adData.author.login}</Card.Text>
                    </Card.Body>
                </Card>
            </Col> 
        </Row>  
    )
}

export default Ad;