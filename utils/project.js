import { ddb } from "./aws"
import constants from "./constants"

async function GetProjectDetailsForDisplay(projectId){
    const getProject = () => {
        return new Promise((resolve, reject) => {
            ddb.getItem({
                Key: { "project_uuid": { S: projectId } },
                TableName: constants.projectsTableName
            }, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    };
    const project = (await getProject()).Item;
    if (!project) {
        return { notFound: true };
    }
    // Fetch data from external API
    const data = { project: {name: project.name.S, id: project.project_uuid.S} }

    // Pass data to the page via props
    return { props: { data } }
}

export {GetProjectDetailsForDisplay};