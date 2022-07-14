import {ddb} from "../utils/aws"

function Page({ data }) {
  return <h1>Hello {data.name} region: {data.region} database name: {data.databaseName} env:{data.env}</h1>
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const data = { name: "Jiaxin Lin", region: process.env.AWS_REGION, databaseName: process.env.PROJECTS_TABLE, env: process.env.AWS_ENV }
  
  // Pass data to the page via props
  return { props: { data } }
}

export default Page