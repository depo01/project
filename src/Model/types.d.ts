declare global {
    interface Array<T> {
        toSorted(compareFn?:(a:T, b:t) => number): T[]
    }
}//

export interface UsersAPI {
    users: User[];
    total: number;
    skip:  number;
    limit: number;
}

export interface User {
    id:         number;
    firstName:  string;
    lastName:   string;
    maidenName: string;
    age:        number;
    gender:     string;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    birthDate:  Date;
    image:      string;
    bloodGroup: string;
    height:     number;
    weight:     number;
    eyeColor:   string;
    hair:       Hair;
    domain:     string;
    ip:         string;
    address:    Address;
    macAddress: string;
    university: string;
    bank:       Bank;
    company:    Company;
    ein:        string;
    ssn:        string;
    userAgent:  string;
    crypto:     Crypto;
}

export interface Address {
    address:     string;
    city?:       string;
    coordinates: Coordinates;
    postalCode:  string;
    state:       string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType:   string;
    currency:   string;
    iban:       string;
}

export interface Company {
    address:    Address;
    department: string;
    name:       string;
    title:      string;
}

export interface Crypto {
    coin:    string;
    wallet:  string;
    network: string;
}

export interface Hair {
    color: string;
    type:  string;
}


// fetch('https://famous-quotes4.p.rapidapi.com/random?category=all&count=2', {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'your-rapidapi-key',
//         'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
//     },
// })
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));