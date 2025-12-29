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

export {
    importToDB,
    readParticpants
}