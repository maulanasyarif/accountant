<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $redirect = $request->redirect;
        $message = $request->message;

        if($redirect && $message) {
            return redirect($redirect)->with('message', $message);
        } else {
            return redirect('dashboard');
        }
    }
}
