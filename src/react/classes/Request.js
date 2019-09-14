const request = require('request');

const host = "localhost/";
const key = "hackmit123456";

class Request {
    static _makeRequest(path, body, blob) {
        return fetch(host + path, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(results => {
            if (!blob) {
                return results.json();
            } else {
                return results.blob();
            }
        });
    }

    static ping(image, location) {
        return this._makeRequest("ping", { 
            image: image,
            location: location,
            key: key
        });
    }

    static choosespace(id) {
        return this._makeRequest("choosespace", {
            id: id,
            key: key
        });
    }
}

export default Request;