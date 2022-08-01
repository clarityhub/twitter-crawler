import { model as averageText } from '../schemas/AverageText';
import { dynamoose } from '../services/DynamoDB';

function getDaysAgo(d, range: number) {
    const newDate: Date = new Date(d - range * 24 * 60 * 60 * 1000);
    newDate.setHours(0);
    newDate.setMinutes(0, 0, 0);
    return newDate;
}

export default class QueryController {
    async getDaysOfData(topic: string, range = 1) {
        const endDate = new Date();
        const startDate = getDaysAgo(endDate, range);

        const condition1 = new dynamoose.Condition("source")
            .eq(`twitter:${topic}`)
            .and()
            .where("date")
            .ge(+startDate);

        const data = await averageText.query(condition1).exec();

        return data;
    }
}
