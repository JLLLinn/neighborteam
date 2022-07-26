import {
  Button, AppShell, Header, Text,
} from '@mantine/core';
import Head from 'next/head';
import constants from '../../utils/constants';
import ProjectInfoCollectionForm from '../../components/ProjectInfoCollectionForm';
import { GetProjectDetailsForDisplay } from '../../utils/project';

function Page({ data }) {
  const title = `${constants.appNameSnake} | ${data.project.name}`;
  return (
    <AppShell>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <ProjectInfoCollectionForm project={data.project} />
    </AppShell>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  return GetProjectDetailsForDisplay(params.project_id);
}

export default Page;
