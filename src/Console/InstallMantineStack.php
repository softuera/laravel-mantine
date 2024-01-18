<?php

namespace Softuera\LaravelMantine\Console;

use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

trait InstallMantineStack
{
    public function runInstall()
    {
        $this->components->info('Installing mantine ui:');

        $this->updateNodePackages(function ($packages) {
            return [
                'react' => '^18.2.0',
                'react-dom' => '^18.2.0',
                '@vitejs/plugin-react' => '^4.0.3',
                'autoprefixer' => '^10.4.12',
                'postcss' => '^8.4.18',
                '@mantine/core' => '^6.0.21',
                '@mantine/hooks' => '^6.0.21',
                '@mantine/form' => '^6.0.21',
                '@mantine/dates' => '^6.0.21',
                '@mantine/notifications' => '^6.0.21',
                '@mantine/modals' => '^6.0.21',
                '@emotion/react' => '^11.11.1',
                'dayjs' => '^1.11.10',
                '@tabler/icons-react' => '^2.43.0',

            ] + $packages;
        });

        $this->setupBackend();
    }

    protected function setupFolderStructure($prefix)
    {
        $jsVersion = $this->option('typescript') ? 'ts' : 'js';

        $this->components->info('Setup Frotend folder structure:');

        $folders = ['js/Components/Partials', 'js/Components/Shared', 'js/Layouts', 'js/Pages', 'js/Context', 'js/Utils'];

        foreach ($folders as $key => $folder) {
            (new Filesystem)->ensureDirectoryExists(resource_path($folder));
            (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/mantine/'.$prefix.'-'.$jsVersion.'/resources/'.$folder, resource_path($folder));
            $this->info('Finished: '.$folder);
        }

        copy(__DIR__.'/../../stubs/mantine/general-'.$jsVersion.'/vite.config.js', base_path('vite.config.js'));
        copy(__DIR__.'/../../stubs/mantine/general-'.$jsVersion.'/resources/js/app.'.$jsVersion.'x', resource_path('js/app.'.$jsVersion.'x'));

        if ($this->option('typescript')) {

        }

    }

    protected function setupBackend()
    {
        $this->components->info('Setup Backend:');

        // Controllers...
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Controllers'));
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/default/app/Http/Controllers', app_path('Http/Controllers'));

        // Requests...
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Requests'));
        (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/default/app/Http/Requests', app_path('Http/Requests'));
    }

    protected function installInertiaJs()
    {
        $this->components->info('Installing InertiaJs Server-Side:');

        // Install Inertia...
        if (!$this->requireComposerPackages(['inertiajs/inertia-laravel:^0.6.11', 'laravel/sanctum:^3.3.2', 'tightenco/ziggy:^1.8.1'])) {
            return 1;
        }
    }

    private $defaultJsLibs = [
        'react' => '^18.2.0',
        'react-dom' => '^18.2.0',
        '@vitejs/plugin-react' => '^4.0.3',
        'autoprefixer' => '^10.4.12',
        'postcss' => '^8.4.18',
    ];

    protected function installMantine()
    {

    }
}
