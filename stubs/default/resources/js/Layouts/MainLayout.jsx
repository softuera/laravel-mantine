import { createTheme, localStorageColorSchemeManager, MantineProvider } from '@mantine/core';

const theme = createTheme({
    primaryColor: "indigo",
    ontFamily: 'Open Sans, sans-serif',
});

const colorSchemeManager = localStorageColorSchemeManager({
    key: 'color-scheme',
  });

export const MainLayout = ({ children }) => {
    return (
        <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
            {children}
        </MantineProvider>
    );
};
