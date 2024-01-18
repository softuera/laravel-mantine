import { AppShell, Burger, Group, Skeleton, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MainLayout } from './MainLayout';
import { Header } from '../Components/Header';

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
                <AppShell.Navbar p="md">
                    {Array(15)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} h={28} mt="sm" animate={false} />
                        ))}
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </MainLayout>
    )
}
