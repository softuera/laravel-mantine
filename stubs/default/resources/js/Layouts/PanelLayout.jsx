import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../Components/Header';
import { Navbar } from '../Components/Navbar';
import { MainLayout } from './MainLayout';

export const PanelLayout = ({ title = "", children }) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <MainLayout title={title}>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: opened } }}
                padding="md"
            >
                <Header opened={opened} toggle={toggle}/>
                <Navbar />
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </MainLayout>
    )
}
