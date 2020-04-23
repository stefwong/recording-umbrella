export function getBaseApiUrl(){

    if(process.env.NODE_ENV === 'production'){
        return 'https://continuous-integration-2020.herokuapp.com/';
    }

    return "http://localhost:3001/";
} 