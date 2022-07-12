function Page({ data }) {
    return <h1>Hello {data.name}</h1>
  }
  
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const data = {name: "Jiaxin Lin"}
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page