import { AuthLayout } from "@/Layouts/AuthLayout";
import { Link, useForm } from '@inertiajs/react';
import { Button, Center, Checkbox, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconLogin2 } from '@tabler/icons-react';

export default function ForgotPassword() {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('panel.login.store'));
    };

    return (
        <AuthLayout title="Forgot Password">
            <Stack>
                <Center>
                    <Title order={2}>Forgot Password</Title>
                </Center>
                <form onSubmit={submit}>
                    <Stack>
                        <TextInput label="Email" placeholder="email@example.com" required onChange={(e) => setData('email', e.target.value)} />
                        <PasswordInput label="Password" placeholder="*******" required onChange={(e) => setData('password', e.target.value)} />
                        <Checkbox defaultChecked label="Remember me" onChange={(e) => setData('remember', e.currentTarget.checked)} />
                        <Button variant="light" radius="md" fullWidth leftSection={<IconLogin2 />} type="submit" loading={processing}>LOG IN</Button>
                        <Group justify="space-between" gap="xl">
                            <Text c="indigo" fw="normal">
                                <Link href={route('panel.register')} style={{ textDecoration: "none", color: "inherit" }}>
                                Forgot your password?
                                </Link>
                            </Text>

                            <Text c="indigo" fw="normal">
                                <Link href={route('panel.register')} style={{ textDecoration: "none", color: "inherit" }}>
                                    Don't have account?
                                </Link>
                            </Text>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </AuthLayout>
    )
}
