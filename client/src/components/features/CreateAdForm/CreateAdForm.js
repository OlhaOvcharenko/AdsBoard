import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AdForm from "../AdForm/AdForm";
import { createAdRequest } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { getUser } from '../../../redux/userRedux';
import { useState } from "react";
import { useEffect } from "react";

const CreateAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
 

  useEffect(() => {
      if (user) {
       
        setAuthor({
          id: user.currentUser.user._id, 
          login: user.currentUser.user.login,
        });

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);
      }
  }, [user]);

  const handleSubmit = ad => {
    dispatch(createAdRequest(ad));
  };

  return (
      <AdForm
          action={handleSubmit}
          actionText="Create advertisement"
          author={author}
          date={date}
      />
  );
};

export default CreateAdForm;