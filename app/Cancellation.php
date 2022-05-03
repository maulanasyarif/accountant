<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cancellation extends Model
{
    public function companies()
    {
        // return $this->belongsToMany('App\Booking', 'cancellations', 'booking_id');
        return $this->belongsTo('App\Booking', 'booking_id');
    }
}
