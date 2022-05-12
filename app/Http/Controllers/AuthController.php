<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        return view('__auth.login');
    }

    public function authenticate(Request $request)
    {
        $api_url = config('app.api_url');

        $response = Http::post($api_url . 'login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);
// dd($response);
        $decode = json_decode($response->body());

        if ($response->status() === 200) {

            $credentials = [
                'user' => $decode->data,
                'token' => $decode->token,
            ];

            $request->session()->put('admin-auth', $credentials);
        }

        return response()->json($decode, $response->status());
    }

    public function logout(Request $request)
    {
        $api_url = config('app.api_url');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $request->session()->get('admin-auth.token'),
        ])->get($api_url . 'logout');

        $decode = json_decode($response->body());

        if ($response->status() === 200) {
            $request->session()->forget('admin-auth');
        }

        return response()->json($decode, $response->status());
    }

    public function update_session(Request $request)
    {
        $encoded = (object) $request->all();

        $request->session()->put('admin-auth.user', $encoded);

        return response()->json([
            'status' => true,
            'message' => 'Success Update Session'
        ], 200);
    }

    public function delete_session(Request $request)
    {
        $request->session()->forget('admin-auth');
        return redirect('login');
    }
}