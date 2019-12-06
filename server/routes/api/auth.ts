import server from '../../lib/server';

server.post('/api/login', async (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    try {
        const token = req.body.token;
        const decodedToken = await server.get('firebase').auth().verifyIdToken(token);
        req.session.token = decodedToken;
        res.json({status: true, decodedToken});
    } catch (error) {
        res.json({status: false, error});
    }
});

server.post('/api/logout', (req, res) => {
    req.session.token = null;
    res.json({status: true});
});

export default server;
