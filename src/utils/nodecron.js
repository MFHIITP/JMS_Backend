import cron from 'node-cron'
import historyschema from '../models/History.model.js'

const updatelogouthistory = async()=>{
    cron.schedule('0 * * * *', async()=>{
        const now = new Date();
        const cutofftime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const result = await historyschema.updateMany(
            {
                outtime: '-',
                intime: {$lte: cutofftime}
            },
            {$set: {
                outtime: 'Logged out after 24 hours',
                status: 'inactive'
            }}
        )
        console.log(`Cron job completed. Modified ${result.modifiedCount} documents.`);
    })
}
export default updatelogouthistory