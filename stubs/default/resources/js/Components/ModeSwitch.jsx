import { AppShell, BackgroundImage, Box, Burger, Center, Grid, Group, Skeleton, Text, Button, useMantineColorScheme, SegmentedControl } from '@mantine/core';

export const ModeSwtich = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <Group>
            {/* <Button onClick={() => setColorScheme('light')}>Light</Button>
            <Button onClick={() => setColorScheme('dark')}>Dark</Button>
            <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
            <SegmentedControl color="blue"
            defaultValue={colorScheme}
            data={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'auto', label: 'Auto' }
            ]}
            onChange={(value) => setColorScheme(value)}/>
        </Group>
    )
}
