<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index()
    {
        return view('__page.agent.index');
    }

    public function add()
    {
        return view('__page.agent.add');
    }
    
    public function edit($id)
    {
        return view('__page.agent.edit', ['id' => $id]);
    }

    public function detail($id)
    {
        return view('__page.agent.detail', ['id' => $id]);
    }
}
