import { ddb } from '../../utils/aws';
import constants from '../../utils/constants';

export default async function handler(req, res) {
  const item = {
    email: { S: req.body.email },
    first_name: { S: req.body.firstName },
    last_name: { S: req.body.lastName },
    phone: { S: req.body.phone },
    street_address: { S: req.body.streetAddress },
    unit_address: { S: req.body.unitAddress },
    city: { S: req.body.city },
    state: { S: req.body.state },
    zip_code: { N: req.body.zipCode },
    project_id: { S: req.body.projectId },
  };
  return new Promise((resolve) => {
    ddb.putItem({
      Item: item,
      TableName: constants.signupsTableName,
    }, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to signup.' });
        console.error(err);
        resolve();
        return;
      }
      res.status(200).end();
      resolve();
    });
  });
}
