import { AuthLayout } from "@/Layouts/AuthLayout"
import { TextInput, Center, Title, Paper, PasswordInput, Stack, Checkbox, Button, Text, Group } from "@mantine/core";
import { Head, Link, useForm } from '@inertiajs/react';
import { IconLogin2 } from '@tabler/icons-react';

export default function Login() {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('panel.login'));
    };

    return (
        <AuthLayout>
            <Head title="Login" />
            <Stack w="60%">


                <Center>
                    <Title order={2}>Login</Title>
                </Center>
                <Paper p="lg" shadow="md" radius="md">
                    <form onSubmit={submit}>
                        <Stack>
                            <TextInput label="Email" placeholder="email@example.com" required onChange={(e) => setData('email', e.target.value)}/>
                            <PasswordInput label="Password" placeholder="*******" required onChange={(e) => setData('password', e.target.value)}/>
                            <Checkbox defaultChecked label="Remember me"  onChange={(e) => setData('remember', e.currentTarget.checked)}/>
                            <Button variant="light" radius="md" fullWidth leftSection={<IconLogin2 />} type="submit" loading={processing}>LOG IN</Button>
                            <Group justify="space-between">
                                <Link href="">
                                    <Text>Forgot your password?</Text>
                                </Link>

                                <Link href={route('panel.register')}>
                                    <Text>Don't have account?</Text>
                                </Link>

                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </AuthLayout>
    )
}
