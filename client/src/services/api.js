import axios from 'axios';

const importToDB = async (file) => {
    const formData = new FormData();
    formData.append('data', file);
    return await axios.post('/import-data', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const readParticpants = async () => {
    return await axios.get('/read');
}

const checkIn = async (token) => {
    return await axios.post(`/check-in/${token}`)
}

const checkOut = async () => {
    return await axios.post(`/check-out/${token}`)
}
export {
    importToDB,
    readParticpants,
    checkIn,
    checkOut
}