import AdForm from "../AdForm/AdForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { editAdRequest } from "../../../redux/adsRedux";

const EditAdForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const adData = useSelector((state) => getAdById(state, id));

    const handleSubmit = ad => {
      const adForm = {id: adData._id, ad}
      dispatch(editAdRequest(adForm));
      navigate('/');
    };

    return (
      <AdForm
        action={handleSubmit}
        actionText='Edit advertisment'
        author={adData.author._id}
        img={adData.photo}
        {...adData}
      />

    );
};

export default EditAdForm;