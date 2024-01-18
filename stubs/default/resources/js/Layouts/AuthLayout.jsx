import { AppShell, BackgroundImage, Box, Burger, Center, Grid, Group, Skeleton, Text, Button, useMantineColorScheme, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MainLayout } from './MainLayout';
import { ModeSwtich } from '../Components/ModeSwitch';

export const AuthLayout = ({ children }) => {

    return (
        <MainLayout>
            <AppShell
                padding={0}
                bg="var(--mantine-color-gray-light)"
            >
                <AppShell.Main>
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack justify="space-between" h="100%" bg="indigo.9">

                                <div />
                                <Text fz={48} ff="text" fw="bold" ta="center" c="white">
                                    Welcome to <br /><Text span c="red" inherit bg="white" px="md">Laravel</Text>-<Text span c="cyan" inherit bg="white" px="md">Mantine</Text>  <br />Back Panel!
                                </Text>
                                <Center mb="md">
                                <ModeSwtich />

                                </Center>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Center h="100vh">
                                {children}
                            </Center>
                        </Grid.Col>
                    </Grid>
                </AppShell.Main>
            </AppShell>
        </MainLayout>
    )
}
