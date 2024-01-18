import { AppShell, Group, Burger, Avatar, Text, Menu, UnstyledButton, Center, Box } from '@mantine/core'
import { forwardRef } from 'react';
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';
import { usePage, router } from '@inertiajs/react'


export const Header = ({ opened, toggle }) => {

    const { auth: { user } } = usePage().props;

    return (
        <AppShell.Header>
            <Group h="100%" justify="space-between">
                <div>
                    <Burger opened={opened} onClick={toggle} size="sm" />
                </div>
                <Group h="inherit" pr="sm">
                    <Box py={4} px="xs"
                        style={{
                            background: "var(--mantine-color-gray-4)",
                            borderRadius: "var(--mantine-radius-md)",
                        }}
                    >
                        <Center>
                            <Menu withArrow radius="md">
                                <Menu.Target>
                                    <UserButton
                                        {...user}
                                    />
                                </Menu.Target>
                                <Menu.Dropdown w="240">
                                    <Menu.Label>Application</Menu.Label>
                                    <Menu.Item leftSection={<IconUser size="1rem" />}
                                        onClick={() => router.visit(route('panel.profile.index'))}
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item
                                        color="red"
                                        leftSection={<IconLogout size="1rem" />}
                                        onClick={() => router.post(route('panel.logout'))}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Center>
                    </Box>
                </Group>
            </Group>
        </AppShell.Header>
    )
}

const getInitials = (name) => {

    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0));

    if (initials.length === 1) {
        return initials[0].substring(0, 2);
    }

    return initials.join('');
}

const UserButton = forwardRef(
    ({ image, name, email, icon, ...others }, ref) => (
        <UnstyledButton
            ref={ref}
            style={{
                color: "var(--mantine-color-text)",
                borderRadius: "var(--mantine-radius-sm)"
            }}
            {...others}
        >
            <Group>
                <Avatar radius="xl" size="md" bg="dark" color="white">{getInitials(name)}</Avatar>

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <IconChevronRight size="1rem" />}
            </Group>
        </UnstyledButton>
    )
)
