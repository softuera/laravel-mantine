<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class Panel
{

    public function navbarMenu()
    {
        $menu = [
            [
                'name' => 'Dashboard',
                'route' => 'panel.dashboard.index'
            ],
            [
                'name' => 'Profile',
                'route' => 'panel.profile.index'
            ],
        ];

        return $this->navbarMenuGenerate($menu);
    }

    public function navbarMenuGenerate($items)
    {
        $results = [];

        foreach ($items as $item) {
            $results [] = [
                ...$item,
                'route' => route($item['route']),
                'active' => \Route::is($item['route']),
            ];
        }

        return $results;
    }

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
            'navbar'  => $this->navbarMenu()
        ]);

        return $next($request);
    }
}
