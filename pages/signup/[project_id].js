import { ddb } from "../../utils/aws"
import constants from "../../utils/constants"

function Page({ data }) {
    return <h1>Hello, you are signing up for project {data.projectName}</h1>
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    const getProject = () => {
        return new Promise((resolve, reject) => {
            ddb.getItem({
                Key: { "id": { S: params.project_id } },
                TableName: constants.projectTableName
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
    const data = { projectName: project.name.S }

    // Pass data to the page via props
    return { props: { data } }
}

export default Page