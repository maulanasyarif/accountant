<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdditionalController extends Controller
{
    public function documentation(){
        return view('__page.additional.documentation');
    }

    public function support(){
        return view('__page.additional.support');

    }

    public function contact(){
        return view('__page.additional.contact');

    }

    public function about(){
        return view('__page.additional.about');
    }
}
