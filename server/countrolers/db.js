import pgPromise from "pg-promise"

const pgp = pgPromise();
const db = pgp('postgresql://retool:5z8VrwLIdxpo@ep-royal-darkness-a61rhmxz.us-west-2.retooldb.com/retool?sslmode=require');

export default db;