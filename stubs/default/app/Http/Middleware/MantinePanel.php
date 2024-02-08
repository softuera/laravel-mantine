<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class MantinePanel
{

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'auth' => [
                'user' => fn (Request $request) => $request->user()
                    ? $request->user()->only('name', 'email')
                    : null
            ],
            'navbar'  => $this->generateMenu()
        ]);

        return $next($request);
    }

    public function generateMenu()
    {
        $menu = Cache::remember('menu-items', 180, function () {

            $folder = "Panel";
            $items = [];

            $directory = app_path('Http/Controllers/' . $folder);
            $controllers = File::glob($directory . '/*.php');

            foreach ($controllers as $controller) {

                $className = '\\App\\Http\\Controllers\\' . $folder . '\\' . basename($controller, '.php');
                $methods = get_class_methods($className);

                if (in_array("menu", $methods)) {
                    $items[] = $this->callControllerMethod($className, "menu");
                }
            }

            return $items;
        });

        return $this->navbarMenuGenerate($menu);
    }


    public function navbarMenuGenerate($items)
    {
        $results = [];

        foreach ($items as $item) {
            $results[] = [
                ...$item,
                'route' => route($item['route']),
                'active' => \Route::is($item['route']),
            ];
        }

        return $results;
    }

    protected function callControllerMethod($className, $methodName)
    {
        return call_user_func([$className, $methodName]);
    }
}
