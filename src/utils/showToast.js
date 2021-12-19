import { toast } from 'react-toastify';

const showToast = (type, message, time = 3000) => {
    toast[type](message, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default showToast