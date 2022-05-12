<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

use PDF;

class ManifestController extends Controller
{
     public function index()
    {
        return view('__page.manifest.index');
    }

    public function detail($id)
    {
        return view('__page.manifest.detail', ['id' => $id]);
    }

    public function print(Request $request, $id)
    {
        // $api_url = config('app.api_url');

        // $response = Http::withHeaders([
        //     'Content-Type' => 'application/json',
        //     'Authorization' => 'Bearer '.$request->session()->get('admin-auth.token'),
        // ])->get($api_url.'booking/'.$id);

        // $decode = json_decode($response->body());

        // if($response->status() === 200){
        //     return view('__page.manifest.print', ['id' => $id, 'data' => $decode->results]);
        // }

        return view('__page.manifest.print', ['id' => $id]);
    }

    public function pdf(Request $request, $id)
    {
        return view('__page.manifest.pdf', ['id' => $id]);
    }
    
}
