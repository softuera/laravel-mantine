<?php

namespace Softuera\LaravelMantine\Console;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class InstallCommand extends Command implements PromptsForMissingInput
{
    use ExecHelpers;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laravel-mantine:install
    {--composer=global : Absolute path to the Composer binary which should be used to install packages}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (! $this->requireComposerPackages(['inertiajs/inertia-laravel:^0.6.11', 'laravel/sanctum:^3.3', 'tightenco/ziggy:^1.8'])) {
            return 1;
        }

        //dev
        $this->updateNodePackages(function ($packages) {
            return [
                "@vitejs/plugin-react" => "^4.2.1",
                "postcss" => "^8.4.35",
                "postcss-preset-mantine" => "^1.13.0",
                "postcss-simple-vars" => "^7.0.1"
            ] + $packages;
        }, true);

        //not dev
        $this->updateNodePackages(function ($packages) {
            return [
                "@inertiajs/inertia-react" => "^0.8.1",
                "@inertiajs/react" => "^1.0.14",
                "@mantine/core" => "^7.5.1",
                "@mantine/form" => "^7.5.1",
                "@mantine/hooks" => "^7.5.1",
                "@tabler/icons-react" => "^2.47.0",
                "react" => "^18.2.0",
                "react-dom" => "^18.2.0"
            ] + $packages;
        }, false);

        $copyDirs = [
            'app/Http/Controllers/Panel',
            'app/Http/Requests/Panel',
            'app/Http/Middleware',
            'resources/js',
            'resources/views',
            'routes',
        ];

        foreach ($copyDirs as $dir) {
            (new Filesystem)->copyDirectory(__DIR__.'/../../stubs/default/'.$dir,  base_path($dir));
        }

        if (file_exists(resource_path('js/app.js'))) {
            unlink(resource_path('js/app.js'));
        }

        if (file_exists(resource_path('views/welcome.blade.php'))) {
            unlink(resource_path('views/welcome.blade.php'));
        }

        copy(__DIR__.'/../../stubs/default/vite.config.js', base_path('vite.config.js'));
        copy(__DIR__.'/../../stubs/default/postcss.config.cjs', base_path('postcss.config.cjs'));

        // Middleware...
        $this->installMiddlewareAfter('SubstituteBindings::class', '\App\Http\Middleware\HandleInertiaRequests::class');
        $this->installMiddlewareAfter('\App\Http\Middleware\HandleInertiaRequests::class', '\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class');

        // "Panel" Route...
        $this->replaceInFile('/home', '/panel', app_path('Providers/RouteServiceProvider.php'));
        $this->replaceInFile('login', 'panel.login', app_path('Http/Middleware/Authenticate.php'));


        $this->components->info('Installing and building Node dependencies.');

        if (file_exists(base_path('pnpm-lock.yaml'))) {
            $this->runCommands(['pnpm install', 'pnpm run build']);
        } elseif (file_exists(base_path('yarn.lock'))) {
            $this->runCommands(['yarn install', 'yarn run build']);
        } else {
            $this->runCommands(['npm install', 'npm run build']);
        }

        $this->line('');
        $this->components->info('Laravel-Mantine scaffolding installed successfully.');
    }
}
