<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public static function menu(){
        return [
            'name' => 'Dashboard',
            'route' => 'panel.dashboard.index'
        ];
    }

    public function index(){
        return Inertia::render('Panel/Dashboard/Index');
    }
}
