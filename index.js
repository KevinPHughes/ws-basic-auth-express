


module.exports = function(callback) {
    return function(req, socket) {
        var authorization, credentials, index, isAuthed, parts, pass, scheme, user;
        authorization = req.headers.authorization;
        if (!authorization) {
            return abortConnection(socket, 400, 'Bad Request');
        }
        parts = authorization.split(" ");
        if (parts.length !== 2) {
            return abortConnection(socket, 400, 'Bad Request');
        }
        scheme = parts[0];
        credentials = new Buffer(parts[1], "base64").toString();
        index = credentials.indexOf(":");
        if ("Basic" !== scheme || index < 0) {
            return abortConnection(socket, 400, 'Bad Request');
        }
        user = credentials.slice(0, index);
        pass = credentials.slice(index + 1);
        isAuthed = callback(user, pass);
        if (!isAuthed) {
            return abortConnection(socket, 401, 'Unauthorized');
        }
    };
};

var abortConnection = function(socket) {
    var code, name, response;
    code = 401;
    name = 'Unauthorized';
    try {
        response = ["HTTP/1.1 " + code + " " + name, "Content-type: text/html"];
        return socket.write(response.concat("", "").join("\r\n"));
    } finally {
        try {
            socket.destroy();
        } catch (_error) {}
    }
};
