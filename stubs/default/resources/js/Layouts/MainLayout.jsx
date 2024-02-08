import { createTheme, localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import { Head } from '@inertiajs/react';

const theme = createTheme({
    primaryColor: "blue",
    ontFamily: 'Open Sans, sans-serif',
});

const colorSchemeManager = localStorageColorSchemeManager({
    key: 'color-scheme',
});

export const MainLayout = ({ title = "", children }) => {
    return (
        <>
            <Head title={title} />
            <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
                {children}
            </MantineProvider>
        </>
    );
};
