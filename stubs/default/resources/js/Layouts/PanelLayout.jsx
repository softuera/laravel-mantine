import { AppShell, Burger, Group, Skeleton, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MainLayout } from './MainLayout';
import { Header } from '../Components/Header';
import { Navbar } from '../Components/Navbar';

export const PanelLayout = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <MainLayout>
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
