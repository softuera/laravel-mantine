<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public static function menu(){
        return [
            'name' => 'Profile',
            'route' => 'panel.profile.index'
        ];
    }

    public function index(){
        return Inertia::render('Panel/Profile/Index');
    }
}
