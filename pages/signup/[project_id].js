import { ddb } from "../../utils/aws"
import constants from "../../utils/constants"
import { Button } from '@mantine/core';
import ProjectSignupForm from "../../components/project_signup_form";

function Page({ data }) {
    return (
        <div>
            <h1>Hello, you are signing up for project {data.projectName}</h1>
            <ProjectSignupForm projectId={data.projectId}/>
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    const getProject = () => {
        return new Promise((resolve, reject) => {
            ddb.getItem({
                Key: { "id": { S: params.project_id } },
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
    const data = { projectName: project.name.S, projectId:project.id.S }

    // Pass data to the page via props
    return { props: { data } }
}

export default Page