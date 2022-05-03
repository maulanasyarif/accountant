<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocalizationController extends Controller
{
    public function index($language)
    {
        if(!in_array($language, config('app.locales'))){
            $fallback = config('app.fallback_locale');
            request()->session()->put('locale', $fallback);
        }

        request()->session()->put('locale', $language);

        return redirect()->back();
    }
}
