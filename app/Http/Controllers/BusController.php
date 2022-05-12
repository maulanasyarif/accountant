<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BusController extends Controller
{
    public function index()
    {
        return view('__page.bus.index');
    }

    public function add()
    {
        return view('__page.bus.add');
    }
    
    public function edit($id)
    {
        return view('__page.bus.edit', ['id' => $id]);
    }

    public function detail($id)
    {
        return view('__page.bus.detail', ['id' => $id]);
    }

    public function add_layout($id)
    {
        return view('__page.bus.add_layout', ['id' => $id]);
    }

    public function edit_layout($id)
    {
        return view('__page.bus.edit_layout', ['id' => $id]);
    }
}
