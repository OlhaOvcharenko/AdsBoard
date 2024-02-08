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
    
    const handleSubmit = (formData) => {
        dispatch(editAdRequest(formData)).then(() => {
            navigate('/'); 
        });
      };

    return (
        <AdForm
            adId={id}
            action={handleSubmit}
            actionText='Edit advertisment'
            
            {...adData}
        />

    );
};

export default EditAdForm;