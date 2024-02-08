import { router } from '@inertiajs/react';
import { AppShell, Box, Button, Center, Container, Group, Paper } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import { ModeSwtich } from '../Components/ModeSwitch';
import { MainLayout } from './MainLayout';


export const AuthLayout = ({ title = "", children }) => {

    return (
        <MainLayout title={title}>
            <AppShell padding={0}>
                <AppShell.Main>
                    <Container size="xs" h="100vh" px="xl">
                        <Center h="100%">
                            <Box  w="100%">
                                <Group mb="xl" justify="space-between">
                                    <Button variant="light" leftSection={<IconHome2 />} onClick={() => router.visit(route('home'))}>HomePage</Button>
                                    <ModeSwtich />
                                </Group>
                                <Paper p="xl" shadow="xl" radius="lg" w="100%" withBorder>
                                    {children}
                                </Paper>
                            </Box>

                        </Center>
                    </Container>
                </AppShell.Main>
            </AppShell>
        </MainLayout>
    )
}
