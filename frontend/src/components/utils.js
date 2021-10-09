export function storeUser(user){
    if (typeof window !== 'undefined') window.localStorage.setItem('user', JSON.stringify(user));
}

export const defaultUser = {
    email: "",
    password: "",
    pseudo: "",
    isConnected: false,
    token: "",
    userId: ""
  };

export function getUser(){
    let user = defaultUser;
    if (typeof window !== 'undefined') {
        const testUser = window.localStorage.getItem('user');
        if (testUser){
            user = JSON.parse(testUser)
        }
};   
    return user;
}

export function clearStore(){
    if (typeof window !== 'undefined') window.localStorage.clear();
}