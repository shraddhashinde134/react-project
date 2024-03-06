function getHeaders(){
    let token = localStorage.getItem("token");
    let config = {headers: { Authorization: `Bearer ${token}` }};
    return config;
}
exports.getHeaders = getHeaders;