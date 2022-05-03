<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgentUserController extends Controller
{
    public function index()
    {
        return view('__page.agent_user.index');
    }

    public function add()
    {
        return view('__page.agent_user.add');
    }
    
    public function edit($id)
    {
        return view('__page.agent_user.edit', ['id' => $id]);
    }

    public function detail($id)
    {
        return view('__page.agent_user.detail', ['id' => $id]);
    }
}
