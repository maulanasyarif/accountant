<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PointController extends Controller
{
    public function index()
    {
        return view('__page.point.index');
    }
    public function add()
    {
        return view('__page.point.add');
    }

    public function edit($id)
    {   
        return view('__page.point.edit', ['id' => $id]);
    }

    public function detail($id)
    {   
        return view('__page.point.detail', ['id' => $id]);
    }
}
