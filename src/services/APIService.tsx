import axios from 'axios'

export class APIService{
    public baseURL: string
    public headers: {[key: string]: string}
    public constructor(auth = false){
        this.baseURL = 'http://localhost:5001'
        this.headers = auth ? 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'} : 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    }

    getHeaders(): {[key: string]: string}{
        return this.headers
    }
    setHeaders(headers: {[key: string]: string}){
        this.headers = headers
    }

    get(path: string, params={}){
        return axios.get(this.baseURL + path, {params: params, headers: this.headers})
    }
    post(path: string, data={}){
        return axios.post(this.baseURL + path, data, {headers: this.headers})
    }
    put(path: string, data={}){
        return axios.put(this.baseURL + path, data, {headers: this.headers})
    }
    delete(path: string) {
        return axios.delete(this.baseURL + path, {headers: this.headers})
    }
}