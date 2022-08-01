import express from 'express';
import QueryController from './controllers/QueryController';
import { debugError, debug } from './services/Logger';

export default function initServer() {
    const app = express();
    const port = process.env.UI_PORT;
    const queryController = new QueryController();

    app.listen(port, () => {
        debug(`Server running on port ${port}`);
    });

    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'ok',
        })
    });

    app.get("/query/getDaysOfData", async (req, res) => {
        const topic: string = req.query.topic as string || 'tesla';
        const range: string = req.query.range as string || '1';

        try {
            const data = await queryController.getDaysOfData(topic, parseInt(range, 10));
    
            res.status(200).json(data);
        } catch (e) {
            debugError('[getDaysOfData] error', e);
            return res.status(500).json({ error: e.toString() });
        }
    });

    app.use(express.static('public'));

}